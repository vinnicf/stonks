import requests
from bs4 import BeautifulSoup
import json

# Load the existing JSON data
with open('companies.json', 'r', encoding='utf-8') as file:
    companies = json.load(file)

# Iterate through each company
for company in companies:
    # Check if the company has a ticker
    if 'ticker' in company:
        ticker = company['ticker']
        print(f"Processing {ticker}")

        url = f'https://fundamentus.com.br/detalhes.php?papel={ticker}'

        # Make a request to the webpage
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        }
        response = requests.get(url, headers=headers)

        # Check if the request was successful
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')
            tables = soup.find_all('table', class_='w728')

            if len(tables) >= 2:
                second_row_second_table = tables[1].find_all('tr')[1]
                first_row_first_table = tables[0].find_all('tr')[0]

                # Extracting preço
                preco_td = first_row_first_table.find_all('td')[3] if first_row_first_table else None
                if preco_td:
                    preco_text = preco_td.get_text(strip=True).replace(',', '.')
                    preco_cents = int(float(preco_text) * 100)
                    company['preco'] = preco_cents
                    print(f"Updated price for {ticker}")

                # Extracting numeroAcoes
                last_td_second_row = second_row_second_table.find_all('td')[-1] if second_row_second_table else None
                if last_td_second_row:
                    company['numeroAcoes'] = last_td_second_row.get_text(strip=True).replace('.', '')
                    print(f"Updated number of stocks issued for {ticker}")

            else:
                print(f"Second table with class 'w728' not found for {ticker}.")
        else:
            print(f"Failed to retrieve the webpage for ticker {ticker}. Status code:", response.status_code)

        # Save the updated data back to the JSON file for each company
        with open('companies.json', 'w', encoding='utf-8') as file:
            json.dump(companies, file, ensure_ascii=False)
            print(f"Saved updates for {ticker}")

print("Finished updating companies.json with 'preco' and 'numeroAcoes'.")
