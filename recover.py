import sys
with open(r'd:\Personal\Portfolio1\noon-portfolio.html', 'r', encoding='utf-8') as f:
    content = f.read()

try:
    recovered = content.encode('cp874').decode('utf-8')
    with open(r'd:\Personal\Portfolio1\noon-portfolio.html', 'w', encoding='utf-8') as f:
        f.write(recovered)
    print("Recovered with cp874")
except Exception as e:
    try:
        recovered = content.encode('cp1252').decode('utf-8')
        with open(r'd:\Personal\Portfolio1\noon-portfolio.html', 'w', encoding='utf-8') as f:
            f.write(recovered)
        print("Recovered with cp1252")
    except Exception as e2:
        print("Failed both:", e, e2)
