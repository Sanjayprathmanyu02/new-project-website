import re

def main():
    # Read index.html footer
    with open('index.html', 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    content = "".join(lines)
    footer_match = re.search(r'(<!-- ════════════════════════════════════════════════\s*FOOTER\s*════════════════════════════════════════════════ -->\s*<footer.*?</footer>)', content, re.DOTALL)
    if not footer_match:
        print("Footer not found in index.html")
        return
        
    footer_html = footer_match.group(1)

    for filename in ['gallery.html', 'videos.html']:
        try:
            with open(filename, 'r', encoding='utf-8') as f:
                page = f.read()
            
            # Replace footer
            page_new = re.sub(
                r'<!-- ════════════════════════════════════════════════\s*FOOTER\s*════════════════════════════════════════════════ -->\s*<footer.*?</footer>',
                footer_html,
                page,
                flags=re.DOTALL
            )
            
            # Make sure script.js is included before gallery.js / videos.js
            if '<script src="script.js"></script>' not in page_new:
                if f'<script src="{filename.replace(".html", ".js")}"></script>' in page_new:
                    page_new = page_new.replace(
                        f'<script src="{filename.replace(".html", ".js")}"></script>',
                        f'<script src="script.js"></script>\n  <script src="{filename.replace(".html", ".js")}"></script>'
                    )
                else:
                    # Append it before </body>
                    page_new = page_new.replace('</body>', '  <script src="script.js"></script>\n</body>')
            
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(page_new)
            print(f'Updated {filename}')
        except Exception as e:
            print(f'Error updating {filename}: {e}')

if __name__ == '__main__':
    main()
