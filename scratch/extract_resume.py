import pypdf

pdf_path = r"C:\Users\Shadab\Downloads\UnbeatableBann-Portfolio - Copy\sketches\Shadab Jamadar Resume.pdf"
output_path = r"C:\Users\Shadab\Downloads\UnbeatableBann-Portfolio - Copy\scratch\resume_text.txt"

reader = pypdf.PdfReader(pdf_path)
text = ""
for page in reader.pages:
    text += page.extract_text() or ""

with open(output_path, "w", encoding="utf-8") as f:
    f.write(text)

print("Text extracted successfully to", output_path)
