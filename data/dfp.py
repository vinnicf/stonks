import pandas as pd
import json

# Load the existing JSON data
with open('companies.json', 'r', encoding='utf-8') as file:
    companies = json.load(file)

# Define the years to process
years = range(2022, 2016, -1) 


# Process each year
for year in years:
    print(f"Processing year: {year}")
    # Update the file names for each year
    files_info = {
        f'dfp_cia_aberta_BPA_con_{year}.csv': {'1': 'ativoTotal'},
        f'dfp_cia_aberta_BPP_con_{year}.csv': {'2.07': 'patrimonioLiquido'},
        f'dfp_cia_aberta_DRE_con_{year}.csv': {'3.01': 'receitaLiquida', '3.11': 'lucro'}
    }

    # Process each file and extract the relevant financial data
    for file_name, codes in files_info.items():
        print(f"Processing file: {file_name}")
        df = pd.read_csv(file_name, encoding='latin1', delimiter=';')
        df_ultimo = df[df['ORDEM_EXERC'] == 'ÚLTIMO']

        for code, var_name in codes.items():
            if var_name == 'patrimonioLiquido':
                # For patrimonioLiquido, filter by the description in DS_CONTA
                df_code = df_ultimo[df_ultimo['DS_CONTA'] == 'Patrimônio Líquido Consolidado']
            else:
                # For other financial data, continue to filter by CD_CONTA
                df_code = df_ultimo[df_ultimo['CD_CONTA'] == code]

            for company in companies:
                cnpj = company['CNPJ']
                row = df_code[df_code['CNPJ_CIA'] == cnpj]

                if not row.empty:
                    company.setdefault('financials', {}).setdefault(str(year), {})
                    company['financials'][str(year)][var_name] = int(row.iloc[0]['VL_CONTA'])
                    print(f"Updated {cnpj} for {year} with {var_name}")

# Save the updated data back to the same JSON file
with open('companies.json', 'w', encoding='utf-8') as file:
    json.dump(companies, file, ensure_ascii=False)
print("Updated companies.json")
