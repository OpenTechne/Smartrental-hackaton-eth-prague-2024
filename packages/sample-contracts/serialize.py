import json

with open('./src/ResidentialLeaseAgreement.sol', 'r') as file:
    solidity_code = file.read()

json_string = json.dumps(solidity_code)

print(json_string)