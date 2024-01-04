import pandas as pd

# Read the specified columns from the CSV file
df = pd.read_csv('dre_2022.csv', usecols=['CNPJ_CIA', 'DENOM_CIA'], encoding='latin1', delimiter=';')

# Remove duplicate CNPJs
df = df.drop_duplicates(subset=['CNPJ_CIA'])

# Rename the columns for clarity
df.rename(columns={'CNPJ_CIA': 'CNPJ', 'DENOM_CIA': 'Denominacao'}, inplace=True)

# Convert to JSON
data_json = df.to_json(orient='records', force_ascii=False)

# Write JSON to a file
with open('companies.json', 'w', encoding='utf-8') as file:
    file.write(data_json)
