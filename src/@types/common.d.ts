type JSONValue = string | number | boolean | null | JSONObject | JSONArray;

interface JSONObject {
  [x: string]: JSONValue;
}

interface JSONArray extends Array<JSONValue> {}

interface OnSuccessParams {
  data: JSONValue;
  statusCode: number;
}

interface OnErrorParams {
  error: string;
  errorDetail: string;
  statusCode: number;
}
