import dotenv from "dotenv";
dotenv.config();

const PRODUCTS_FILENAME = "products";
const CARTS_FILENAME = "carts";

const config = {
	SERVER: {
		PORT: process.env.PORT || 8080,
		SELECTED_DATABASE: process.env.SELECTED_DB ?? "memory",
	},
	DATABASES: {
		filesystem: {
			PRODUCTS_FILENAME,
			CARTS_FILENAME,
		},
		mongo: {
			url: process.env.MONGO_DB_URL,
			dbName: process.env.MONGO_DB_NAME,
		},
		firebase: {
			type: "service_account",
			project_id: "trabajoc-db4de",
			private_key_id: "86b092c3b8fc724c6fc91693d58d6c92436eea5c",
			private_key:
				"-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCxWhOIT8K1ShYK\nYX92HFQogY0yleiDsVbZ0JBES6A6sE3b5Gp48XsPYlmke8lB/Zrm3z7m0v8112lO\n2S75T3KWISkZxRyeTZglrIYaXs5gVRxI0opMt0LneBQT1Ng1clNRK/3O0fG2DCe5\nYP5Iu4A3U2muOmRNNo4Nv3IjDsFNSB5BY4A6FDRT9XYPgXGS8SpzJJeUxE9uIK83\namM/dLYe6pqe/hrx0k7Jfp5ERkc3fBsg+yTE9SsZz5kwe+y646wCXmyOSDc2+NKn\ne+VBfI75bHI+iXyM+zLj4hMNOIhzC0uloFFMWho0bZpZTjodbuAK1LAE1+b2PxZr\nc6l9GHLRAgMBAAECggEAOBYB5lI/A6D9zmOd8QatcK/jrNMumHMdQb3M2eRGtDis\nLrWSHFRVs/xI2BUThQyED64bENk6P1czpO1XBx3iYWr0OgOVdNSaIJPqRu2je2B/\nFOKMPQ2ZmWTmiIz/oQtaIOn2FpFbTNSUPXJYiDzPo+97lM8/iBGQI/XezQpuBBeb\nMyO4CZNHpe8Mk0xT8kaVgjs5n4CbSjfjxDpmIbeYc1AlTJcAVGt0Ueppg542C6sl\noJXeV7jUJeeVPrvPpvJcWUsIpxgnANxnB72Tb7Pz2AmfREQG1XM0dXVFpIzYE8wd\nZs7UHW0hQzP//XtRvffdDaCvJ1q3zErZjNehUfw7HwKBgQDbJXTQcW68t5WaVwta\nreP90Lj68wRDwRkqVpNFr0KDKMcOdmblo5tL8gaIj43PSePiB7wyw5aNLJkl7Aaq\n0+7JYHOO1eT17bSfNlQVMnVpnOChLh2gtdm3ubCMgDSFsveGLmrQUcL2R2S/gFK2\nacJU3gbBEpjYPOAWCjZxUEKhcwKBgQDPLVAC867ItG7+1sfB5MRZmpxtsRHl9It7\nKw+fApWkdVZ/cgzRcoHtxViOri8CCVwA8zVJeXWLL5On9okA30rDvpzItUJHw75A\ncmOvwUSHPplsuxQESXwIxYQj54GPdjdqpJGR5drKH4z+VCiHP938+TaxXX/vJXFI\nx0BkUcw5qwKBgQC/S5sEuX/ozHiTGZiXt2NllGVk6e23F0BYbOpx0eNFirr4LPL1\nUjOlv8dkPauUXvPFwurNhV5OLbgiGj5XsFipAMDe1mffJXid4lbTihBj+MU87Xx/\nZT5/2l/6xY8Thn37a1liL3z4bqnLYMDS6s7wNj+/GfTCDaGum4uarmz7cQKBgQCr\nVCin2EeBuR1VZ98YLIxoIWEdoWJQzdQPToQDloqTz2lxyapqBw0Fyb67d7ZuM7k/\nG+HEWkpniTfNniacbwwQJnDX1nXyjSCngTGJJgX65jzQ20Dpbq/BPT5Sxt+w+S1I\n5sFvayttHXxm0sgVWS7GRn4BXXYwGcG+UvCgRbjjMwKBgFIZJ6FdTtygoagfg6hu\nSJL2egfADZ0xreTZzahOa4RFiV+rwYqoM6zQSFVEV0YybSyHmBbPHniNcEdVTo7P\nFbF1N3EnMHxc5yYa2qZtbdKQ0uHAohytaPBA5s5t629WKgpLw0cUyt2t15rO2O7G\np03eOgNKZ0PvV80WGXEyv8ee\n-----END PRIVATE KEY-----\n",
			client_email:
				"firebase-adminsdk-zwtbi@trabajoc-db4de.iam.gserviceaccount.com",
			client_id: "109311370346963522581",
			auth_uri: "https://accounts.google.com/o/oauth2/auth",
			token_uri: "https://oauth2.googleapis.com/token",
			auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
			client_x509_cert_url:
				"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zwtbi%40trabajoc-db4de.iam.gserviceaccount.com",
		},
	},
};

export { config };
