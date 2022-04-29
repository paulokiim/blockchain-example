type JSONValue = string | number | boolean | JSONObject | JSONArray | Block;

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
