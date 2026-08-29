from playwright.sync_api import sync_playwright

def test_login():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        print("Acessando a página de login local...")
        page.goto('http://localhost:3000/login')
        
        page.wait_for_load_state('networkidle')
        
        print("Preenchendo credenciais...")
        page.fill('input[name="email"]', 'FetchLeadss@gmail.com')
        page.fill('input[name="password"]', 'Password123!')
        
        print("Clicando em Entrar...")
        page.click('button[type="submit"]')
        
        page.wait_for_load_state('networkidle')
        
        # Validar redirecionamento para o dashboard
        print("URL após login:", page.url)
        
        if "/dashboard" in page.url or "/community" in page.url:
            print("✅ Webapp testing: Autenticação funcional e redirecionamento correto!")
        else:
            print("❌ Falha no redirecionamento após o login.")
            
        browser.close()

if __name__ == "__main__":
    test_login()

