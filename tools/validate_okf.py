#!/usr/bin/env python3
from __future__ import annotations

import datetime as dt
import re
import sys
from pathlib import Path

import yaml


BUNDLE = Path(__file__).resolve().parent.parent
RESERVED = {"index.md", "log.md"}
LINK_RE = re.compile(r"(?<!!)\[[^\]]+\]\(([^)]+)\)")
DATE_HEADING_RE = re.compile(r"^## (\d{4}-\d{2}-\d{2})$", re.MULTILINE)
ALLOWED_STATUS = {"draft", "stable", "deprecated"}


def split_frontmatter(path: Path, required: bool = True):
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---\n"):
        if required:
            raise ValueError("missing opening YAML frontmatter delimiter")
        return None, text
    end = text.find("\n---\n", 4)
    if end < 0:
        raise ValueError("missing closing YAML frontmatter delimiter")
    data = yaml.safe_load(text[4:end])
    if not isinstance(data, dict):
        raise ValueError("frontmatter must parse as a YAML mapping")
    return data, text[end + 5 :]


def check_timestamp(value, label: str):
    if isinstance(value, dt.datetime):
        parsed = value
    elif isinstance(value, str):
        parsed = dt.datetime.fromisoformat(value.replace("Z", "+00:00"))
    else:
        raise ValueError(f"{label} must be an ISO 8601 datetime")
    if parsed.tzinfo is None:
        raise ValueError(f"{label} must include an explicit UTC offset")


def resolve_internal(source: Path, target: str) -> Path | None:
    target = target.strip().split("#", 1)[0].split("?", 1)[0]
    if not target or target.startswith(("http://", "https://", "mailto:")):
        return None
    if target.startswith("/"):
        resolved = BUNDLE / target.lstrip("/")
    else:
        resolved = source.parent / target
    if target.endswith("/"):
        resolved /= "index.md"
    return resolved.resolve()


def main() -> int:
    errors: list[str] = []
    concepts = 0
    links = 0

    for path in sorted(BUNDLE.rglob("*.md")):
        relative = path.relative_to(BUNDLE)
        try:
            if path.name == "index.md":
                if relative == Path("index.md"):
                    meta, body = split_frontmatter(path, required=True)
                    if str(meta.get("okf_version")) != "0.2":
                        raise ValueError('root index must declare okf_version: "0.2"')
                    if set(meta) != {"okf_version"}:
                        raise ValueError("root index frontmatter may contain only okf_version")
                else:
                    meta, body = split_frontmatter(path, required=False)
                    if meta is not None:
                        raise ValueError("subdirectory index.md must not contain frontmatter")
            elif path.name == "log.md":
                meta, body = split_frontmatter(path, required=False)
                if meta is not None:
                    raise ValueError("log.md must not contain frontmatter")
                headings = DATE_HEADING_RE.findall(body)
                if not headings:
                    raise ValueError("log.md requires at least one ISO 8601 date heading")
                for heading in headings:
                    dt.date.fromisoformat(heading)
            else:
                concepts += 1
                meta, body = split_frontmatter(path, required=True)
                if not isinstance(meta.get("type"), str) or not meta["type"].strip():
                    raise ValueError("frontmatter requires a non-empty type field")
                if "status" in meta and meta["status"] not in ALLOWED_STATUS:
                    raise ValueError("status must be draft, stable or deprecated")
                if "generated" in meta:
                    generated = meta["generated"]
                    if not isinstance(generated, dict) or not generated.get("by"):
                        raise ValueError("generated requires by")
                    if "at" in generated:
                        check_timestamp(generated["at"], "generated.at")
                verified = meta.get("verified", [])
                if isinstance(verified, dict):
                    verified = [verified]
                if not isinstance(verified, list):
                    raise ValueError("verified must be a mapping or list")
                for event in verified:
                    if not isinstance(event, dict) or not event.get("by") or "at" not in event:
                        raise ValueError("each verified event requires by and at")
                    check_timestamp(event["at"], "verified.at")
                if "stale_after" in meta:
                    check_timestamp(meta["stale_after"], "stale_after")
                for source_item in meta.get("sources", []):
                    if not isinstance(source_item, dict) or not source_item.get("resource"):
                        raise ValueError("each sources entry requires resource")
                    source_target = resolve_internal(path, str(source_item["resource"]))
                    if source_target is not None and not source_target.exists():
                        raise ValueError(f"missing bundle-relative source: {source_item['resource']}")

            for match in LINK_RE.finditer(body):
                target = match.group(1)
                resolved = resolve_internal(path, target)
                if resolved is not None:
                    links += 1
                    if not resolved.exists():
                        errors.append(f"{relative}: broken internal link {target}")
        except Exception as exc:
            errors.append(f"{relative}: {exc}")

    if errors:
        print("OKF v0.2 validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print("OKF v0.2 validation passed")
    print(f"Concept documents: {concepts}")
    print(f"Internal links checked: {links}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
