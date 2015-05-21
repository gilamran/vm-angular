'use strict';

var experiment = {
	'a': true
}
module.exports = {
  '${debug}': 'true',
  '${enableMocks}': 'false',
  '${experiments}': JSON.stringify(experiments),
  '${experimentsMap}': experiments,
  '${locale}': 'en',
	'${appModel}': JSON.stringify({
		'topology': {
			'bulkExecutionUrl': '/_api/wix-ecommerce-renderer-web/store-manager/executeCatalogCommands',
			'getStoreManagerCategoriesListUrl': '/_api/wix-ecommerce-renderer-web/store-manager/categories',
			'getProductsListUrl': '/_api/wix-ecommerce-renderer-web/store-manager/products',
		},
		'experiments': {
			'specs.DynamicPayments': 'false',
			'specs.OpenAddProductPopupOnEnter2' : 'true',
			'specs.StoreManagerSettings2' : 'true',
			'specs.AddTooltipsToProductOptionsTable' : 'true',
			'specs.ShowGetECommercePlanLinkOnOrderPage' : 'true',
			'specs.AddUpgradeToAcceptPaymentTooltip' : 'true',
			'specs.OpenMediaGalleryViaSdk' : 'false'
		},
		'appData': {
			'currency': 'USD'
		},
		'clientConfig': {
			'storeId': 'DUMMY_STORE_ID',
			'isMerchant': true,
			'isPremium': 'false',
			'userId': 'DUMMY_USER_ID',
			'ecomSessionId': 'DUMMY_ECOM_SESSION_ID',
			'${locale}': 'en',
			'${debug}': true
		}
	}),
  '${staticBaseUrl}': '//static.parastorage.com/',
  '${staticsUrl}': '//localhost:9000/',
  '${newRelicEndUserHeader}': '',
  '${newRelicEndUserFooter}': ''
};
