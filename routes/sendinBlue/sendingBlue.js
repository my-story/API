var SibApiV3Sdk = require('sib-api-v3-sdk');
var defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = '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';

var apiInstance = new SibApiV3Sdk.ContactsApi();

var createContact = new SibApiV3Sdk.CreateContact(); // CreateContact | Values to create a contact
createContact = { 'email' : "john@doe.com" };

apiInstance.createContact(createContact).then(function(data) {
  console.log('API called successfully. Returned data: ' + data);
}, function(error) {
  console.error(error);
});