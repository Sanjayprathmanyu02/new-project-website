import re

def update_html(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Add Floating button
    if 'id="floating-btt"' not in content:
        floating_btn = '\n  <!-- Floating Back to Top Button -->\n  <button id="floating-btt" class="floating-btt" aria-label="Back to top">\n    <i data-lucide="arrow-up"></i>\n  </button>\n\n  <script src="config.js">'
        content = content.replace('  <script src="config.js">', floating_btn)
    
    # 2. Add GSAP to videos.html
    if filename == 'videos.html' and 'gsap.min.js' not in content:
        gsap_scripts = '  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>\n  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>\n  <script src="script.js">'
        content = content.replace('  <script src="script.js">', gsap_scripts)
        
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

for file in ['index.html', 'gallery.html', 'videos.html']:
    try:
        update_html(file)
        print(f"Updated {file}")
    except Exception as e:
        print(f"Error on {file}: {e}")
