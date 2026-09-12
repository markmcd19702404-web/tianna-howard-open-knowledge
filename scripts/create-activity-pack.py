from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle, KeepTogether
from pathlib import Path

OUT = Path('docs/resources/tianna-howard-teacher-reader-activity-pack.pdf')
OUT.parent.mkdir(parents=True, exist_ok=True)

INK = colors.HexColor('#15110e')
PAPER = colors.HexColor('#f5f0e7')
GOLD = colors.HexColor('#b78b38')
BROWN = colors.HexColor('#5d3826')
LINE = colors.HexColor('#d2c3ad')

pdfmetrics.registerFont(TTFont('DejaVuSans', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSans-Bold', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSerif', '/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSerif-Bold', '/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf'))
pdfmetrics.registerFontFamily('DejaVuSans', normal='DejaVuSans', bold='DejaVuSans-Bold')
pdfmetrics.registerFontFamily('DejaVuSerif', normal='DejaVuSerif', bold='DejaVuSerif-Bold')

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='PackTitle', parent=styles['Title'], fontName='DejaVuSerif-Bold', fontSize=28, leading=31, textColor=INK, alignment=TA_CENTER, spaceAfter=14))
styles.add(ParagraphStyle(name='PackSubtitle', parent=styles['Normal'], fontName='DejaVuSerif', fontSize=14, leading=20, textColor=BROWN, alignment=TA_CENTER, spaceAfter=18))
styles.add(ParagraphStyle(name='H1x', parent=styles['Heading1'], fontName='DejaVuSerif-Bold', fontSize=21, leading=24, textColor=INK, spaceAfter=10))
styles.add(ParagraphStyle(name='H2x', parent=styles['Heading2'], fontName='DejaVuSans-Bold', fontSize=12, leading=15, textColor=BROWN, spaceBefore=9, spaceAfter=5))
styles.add(ParagraphStyle(name='Bodyx', parent=styles['BodyText'], fontName='DejaVuSans', fontSize=10.5, leading=15, textColor=INK, spaceAfter=7))
styles.add(ParagraphStyle(name='Smallx', parent=styles['BodyText'], fontName='DejaVuSans', fontSize=8.5, leading=12, textColor=colors.HexColor('#6f665d')))
styles.add(ParagraphStyle(name='Prompt', parent=styles['BodyText'], fontName='DejaVuSans-Bold', fontSize=11, leading=16, textColor=INK, borderColor=GOLD, borderWidth=1, borderPadding=9, backColor=colors.white, spaceBefore=7, spaceAfter=9))

def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(GOLD)
    canvas.line(18*mm, 15*mm, 192*mm, 15*mm)
    canvas.setFont('DejaVuSans', 8)
    canvas.setFillColor(colors.HexColor('#6f665d'))
    canvas.drawString(18*mm, 10*mm, 'Tianna Howard Adventures | Free spoiler-safe learning resource')
    canvas.drawRightString(192*mm, 10*mm, f'{doc.page}')
    canvas.restoreState()

def rule():
    return Table([['']], colWidths=[174*mm], rowHeights=[1.2*mm], style=TableStyle([('BACKGROUND',(0,0),(-1,-1),GOLD),('BOX',(0,0),(-1,-1),0,GOLD)]))

story = []
story += [Spacer(1, 24*mm), Paragraph('TIANNA HOWARD ADVENTURES', styles['Smallx']), Spacer(1, 7*mm), Paragraph('Teacher and Reader<br/>Activity Pack', styles['PackTitle']), Paragraph('Codes, evidence and real historical mysteries for ages 11-14', styles['PackSubtitle']), rule(), Spacer(1, 13*mm), Paragraph('<b>Inside:</b> a cipher challenge, source-reliability test, missing-art investigation, discussion prompts and facilitator answers.', styles['Bodyx']), Spacer(1, 8*mm), Paragraph('This pack is free to copy for classroom, library and family use. It is spoiler-safe and can be used without reading the novels first.', styles['Prompt']), Spacer(1, 25*mm), Paragraph('Historical fiction mysteries by M.L. Woodward', styles['PackSubtitle']), Paragraph('knowledge.tiannahowardadventures.com', styles['Smallx']), PageBreak()]

story += [Paragraph('1. Crack the starter cipher', styles['H1x']), Paragraph('The real Beale Papers contain three numerical ciphers. This warm-up uses a much simpler Caesar shift so everyone can practise looking for a rule.', styles['Bodyx']), Paragraph('<b>The rule:</b> each encoded letter has been moved three places forward through the alphabet. Move each letter three places back to decode it.', styles['Prompt']), Paragraph('ORRN  IRU  WKH  NHB  LQ  KLVWRUB', styles['PackTitle']), Spacer(1, 5*mm), Paragraph('Questions', styles['H2x']), Paragraph('1. What does the message say?<br/>2. Which repeated patterns helped you?<br/>3. Why is knowing the method as important as having the coded text?<br/>4. How is this different from the still-unsolved Beale ciphers?', styles['Bodyx']), Spacer(1, 8*mm), Paragraph('Extension', styles['H2x']), Paragraph('Write a short eight-to-twelve-word clue. Encode it with the same shift and exchange it with another reader. Include enough context for them to recognise when the answer makes sense.', styles['Prompt']), Paragraph('<b>Evidence note:</b> This activity is inspired by code-solving. It is not one of the historical Beale ciphers.', styles['Smallx']), PageBreak()]

story += [Paragraph('2. Which source would you trust?', styles['H1x']), Paragraph('A researcher finds four claims about a hidden treasure. Rank the sources from most useful to least useful, then explain what each can and cannot prove.', styles['Bodyx'])]
data = [
    [Paragraph('<b>Source</b>', styles['Bodyx']), Paragraph('<b>What it says</b>', styles['Bodyx']), Paragraph('<b>Questions to ask</b>', styles['Bodyx'])],
    [Paragraph('A',styles['Bodyx']),Paragraph('A dated payment record written by a clerk at the time.',styles['Bodyx']),Paragraph('Is it original? Who ordered it? Is anything missing?',styles['Bodyx'])],
    [Paragraph('B',styles['Bodyx']),Paragraph('A map copied two hundred years later, with no named creator.',styles['Bodyx']),Paragraph('What was copied? Were details changed?',styles['Bodyx'])],
    [Paragraph('C',styles['Bodyx']),Paragraph('A modern social-media post claiming the treasure was found.',styles['Bodyx']),Paragraph('Does it cite evidence? Can the claim be checked?',styles['Bodyx'])],
    [Paragraph('D',styles['Bodyx']),Paragraph('A local oral tradition recorded in several independent interviews.',styles['Bodyx']),Paragraph('Which details agree? When did the tradition begin?',styles['Bodyx'])],
]
t=Table(data,colWidths=[14*mm,74*mm,82*mm],repeatRows=1)
t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),INK),('TEXTCOLOR',(0,0),(-1,0),colors.white),('GRID',(0,0),(-1,-1),0.5,LINE),('VALIGN',(0,0),(-1,-1),'TOP'),('BACKGROUND',(0,1),(-1,-1),colors.white),('LEFTPADDING',(0,0),(-1,-1),6),('RIGHTPADDING',(0,0),(-1,-1),6),('TOPPADDING',(0,0),(-1,-1),6),('BOTTOMPADDING',(0,0),(-1,-1),6)]))
story += [t, Spacer(1,7*mm), Paragraph('Write your ranking and the reason for your first choice:',styles['H2x']), Paragraph('________________________________________________________________________________<br/><br/>________________________________________________________________________________<br/><br/>________________________________________________________________________________',styles['Bodyx']), Paragraph('<b>Remember:</b> A primary source can still be incomplete, biased or misunderstood. Good historical reasoning compares sources instead of treating one document as the whole truth.',styles['Prompt']), PageBreak()]

story += [Paragraph('3. The missing-art file', styles['H1x']), Paragraph('A sculpture disappears during wartime. Decades later, a similar object appears in a private collection. You have the following evidence:', styles['Bodyx']), Paragraph('• A 1938 museum catalogue photograph<br/>• A 1944 transport list with a shortened title<br/>• A soldier’s letter describing crates leaving the town<br/>• A modern photograph of the private sculpture<br/>• No laboratory analysis and no continuous ownership record', styles['Prompt']), Paragraph('Investigation questions', styles['H2x']), Paragraph('1. What could connect the modern sculpture to the museum object?<br/>2. What evidence is still missing?<br/>3. Does wartime disappearance prove who removed it?<br/>4. Which expert would you consult first, and why?<br/>5. Write a cautious two-sentence conclusion that does not claim more than the evidence supports.', styles['Bodyx']), Spacer(1, 6*mm), Paragraph('Your conclusion',styles['H2x']), Paragraph('________________________________________________________________________________<br/><br/>________________________________________________________________________________<br/><br/>________________________________________________________________________________<br/><br/>________________________________________________________________________________',styles['Bodyx']), Paragraph('<b>Connection:</b> The real Mask of a Faun attributed to the young Michelangelo disappeared from the Castle of Poppi during German looting in 1944. It remains missing. The Tianna Howard story is fictional.',styles['Prompt']), PageBreak()]

story += [Paragraph('4. Discuss, investigate and create', styles['H1x']), Paragraph('Discussion',styles['H2x']), Paragraph('• When does a legend become worth investigating?<br/>• Should museums display uncertain attributions?<br/>• Who should decide where a recovered object belongs?<br/>• Can a fictional story be historically responsible while inventing its solution?',styles['Bodyx']), Paragraph('Mini research task',styles['H2x']), Paragraph('Choose one unresolved historical mystery. Find two reliable sources. Record what both sources agree on, where they differ and what remains unknown. Avoid sources that repeat a claim without identifying where it came from.',styles['Prompt']), Paragraph('Creative challenge',styles['H2x']), Paragraph('Write the opening 150 words of a historical mystery. Begin with an object, code or record that raises a question. Give the reader one solid fact and one detail that may be misleading. Do not reveal the answer.',styles['Prompt']), Paragraph('Further exploration',styles['H2x']), Paragraph('Free evidence guides and videos are available at:<br/><b>knowledge.tiannahowardadventures.com</b><br/><br/>The Tianna Howard Adventures combine real history, global locations and logical problem-solving. There is no fantasy or magic.',styles['Bodyx']), PageBreak()]

story += [Paragraph('Facilitator notes and answers', styles['H1x']), Paragraph('Cipher answer',styles['H2x']), Paragraph('<b>LOOK FOR THE KEY IN HISTORY</b>. Readers may notice that WKH repeatedly decodes to THE. The task demonstrates how a known method makes verification possible; the historical Beale ciphers do not come with an agreed solution method.',styles['Bodyx']), Paragraph('Source activity',styles['H2x']), Paragraph('A reasonable starting ranking is A, D, B, C, but the explanation matters more than the exact order. Source A is contemporary but may record only an administrative viewpoint. Source D preserves local knowledge but requires comparison and dating. Source B has an unexplained chain of copying. Source C is weakest until it provides checkable evidence.',styles['Bodyx']), Paragraph('Missing-art activity',styles['H2x']), Paragraph('Useful next steps include comparing dimensions and tool marks, establishing the transport-list identity, tracing ownership after 1944, consulting provenance specialists and conducting material analysis. The available evidence supports investigation, not a confident identification.',styles['Bodyx']), Paragraph('Suggested use',styles['H2x']), Paragraph('Allow 35-50 minutes for Activities 1-3, or use one activity at a time. Ask readers to label statements as fact, inference or speculation. This keeps the focus on evidence rather than guessing the intended answer.',styles['Bodyx']), Spacer(1,10*mm), rule(), Spacer(1,8*mm), Paragraph('About the series',styles['H2x']), Paragraph('The Tianna Howard Adventures are historical fiction mysteries by M.L. Woodward for readers aged 11-14. Real history supplies the foundation. Tianna, her investigations and each story resolution are fictional.',styles['Bodyx']), Paragraph('General, schools and library enquiries: info@tiannahowardadventures.com',styles['Smallx'])]

doc = SimpleDocTemplate(str(OUT), pagesize=A4, rightMargin=18*mm, leftMargin=18*mm, topMargin=18*mm, bottomMargin=21*mm, title='Tianna Howard Teacher and Reader Activity Pack', author='M.L. Woodward')
doc.build(story, onFirstPage=footer, onLaterPages=footer)
print(OUT)
