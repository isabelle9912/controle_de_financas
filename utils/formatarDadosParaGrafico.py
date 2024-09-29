import pandas as pd

""" def formatarJson(data):
    df = pd.DataFrame(data)
    print(df)
    return """

def formatarJson(data):
    df = pd.DataFrame(data)
    return df.to_json(orient='records')  # Retorna o JSON formatado