import json

# Load the existing JSON data
with open('companies.json', 'r', encoding='utf-8') as file:
    companies = json.load(file)

# Read CNPJ values from cnpj.txt and store them in a set for efficient lookup
with open('cnpj.txt', 'r', encoding='utf-8') as file:
    valid_cnpjs = {line.strip() for line in file}

for company in companies:
    # Check if the company's CNPJ is in the valid CNPJs
    if company['CNPJ'] in valid_cnpjs:
        # Check if the ticker already exists
        if 'ticker' in company:
            continue  # Skip to the next company

        # Display CNPJ and Denominacao
        print(f"CNPJ: {company['CNPJ']}, Denominacao: {company['Denominacao']}")

        # Prompt for ticker input
        ticker = input("Enter ticker for this company (press enter to skip): ").strip()

        # If a ticker is provided, update the company entry
        if ticker:
            company['ticker'] = ticker

            # Save the updated data back to the JSON file
            with open('companies.json', 'w', encoding='utf-8') as file:
                json.dump(companies, file, ensure_ascii=False)
                print("Saved ticker for company.")


print("Finished updating companies.json with tickers.")
