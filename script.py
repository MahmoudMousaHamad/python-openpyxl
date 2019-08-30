from openpyxl import load_workbook
import re
import base64

class Pricing:
    def __init__(self, code, encoded_code, title, kind, price):
        self.code = code
        self.encoded_code = encoded_code
        self.title = title
        self.kind = kind
        self.price = price
    
    def generate_anchor_element(self):
        if self.kind == "CEO":
            return f"<a href='/entry-form-executives/?sub_sector={self.title}&code={self.encoded_code}'>{self.title}</a>"
        else:
            return f"<a href='/entry-form-organizations/?sub_sector={self.title}&code={self.encoded_code}'>{self.title}</a>"

    def generate_case_statement(self):
        return f"case: '{self.code}': \n price = {self.price}; \n break; \n"



wb = load_workbook("Workbook.xlsx")

sheet = wb.active

max_row = sheet.max_row
max_col = sheet.max_column

pricings = []

# row
for i in range(1, max_row + 1):
    row_data = []
    is_pricing_row = False
    # column
    for j in range(1, max_col + 1):
        cell = sheet.cell(row = i, column = j)
        cell_val = cell.value
        if cell_val:
            regex = re.compile(r'^[A-Z][0-9]{1,2}?$')
            if regex.search(cell_val):
                is_pricing_row = True
            if is_pricing_row:
                row_data.append(cell_val.strip())
            print(cell_val.strip(), end = " ")
    if is_pricing_row:
        code = row_data[0]
        encoded_code = base64.b64encode(code.encode("utf-8"))
        title = row_data[1]
        kind = 'CEO' if 'CEO' in title else 'ORG'
        price = row_data[2][3:]
        pricing = Pricing(code, encoded_code, title, kind, price)
        pricings.append(pricing)
        print(pricing.generate_anchor_element())
    print('\n')

# Write to files
fa = open("anchor_elements.txt", "w")
fa.write("Anchor Elements \n")
fa.close()

fc = open("case_statements.txt", "w")
fc.write("Case Statements \n")
fc.close()

fa = open("anchor_elements.txt", "a")
fc = open("case_statements.txt", "a")

for i in range(0, len(pricings)):
    fa.write(pricings[i].generate_anchor_element() + '\n')
    fc.write(pricings[i].generate_case_statement() + '\n')

fa.close()
fc.close()
