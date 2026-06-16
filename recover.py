import sys

FILE_PATH = r'd:\Personal\Portfolio1\noon-portfolio.html'

with open(FILE_PATH, 'r', encoding='utf-8') as f:
    content = f.read()

try:
    recovered = content.encode('cp874').decode('utf-8')
    with open(FILE_PATH, 'w', encoding='utf-8') as f:
        f.write(recovered)
    print("Recovered with cp874")
except UnicodeError as e:
    try:
        recovered = content.encode('cp1252').decode('utf-8')
        with open(FILE_PATH, 'w', encoding='utf-8') as f:
            f.write(recovered)
        print("Recovered with cp1252")
    except UnicodeError as e2:
        print("Failed both:", e, e2)
