const onSuccess = (params: OnSuccessParams) => {
  const { data, statusCode } = params;
  return {
    data,
    statusCode,
  };
};

const onError = (params: OnErrorParams) => {
  const { error, errorDetail, statusCode } = params;
  return {
    error,
    errorDetail,
    statusCode,
  };
};

export default { onSuccess, onError };
