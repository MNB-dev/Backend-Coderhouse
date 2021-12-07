export default {
    firebase: {
        type : "service_account",
        project_id: "coderhouse-625e1",
        private_key_id: "5d700a7362cd376b537cfe91c0dc6f49694bc4ae",
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDZJczWSyeVG1wT\nn7+jasHhDC5ISuiOjywiNrH9Jm9nqHT76Yefvnvo52E8Sj5ouF+rx/vgcTMFFdyB\nqakT90KKOa95cus0H5saNOQyDU5iNTKIEGGxC2XcaGwin7Z1ucjiVmZRYMOsLGC8\n04kMdR2TKLyxfdnnFIja8DykZ4OzvNBxDChaTLsUUkinFQG5ysqsKFZRh1/OusMb\nw+4BowEz3F0AG3FeDqcm2Dc7oFyz3+1LcU1g6VsvSBYrzjlz9DI59Vx3wEQheF6w\nmLdvZQYGGUWMH7VyBo6EuyMgG8gGKrRJmPCxBsjo/NkRJmTSwUNModlBhSfNslRj\nzN21b9N5AgMBAAECggEACwxUTY3AfIc3+jugpzKWCv8VhFIaOh6fku/G52ewyfE5\nzMo99iICOoBerNkJnUap7S0dNS4IrqX79JDqkOo0rFdxBI+U+6+AjkuAnw4rHcl6\n1EUiPr0QuGZCkjaxxt2dJMgSAzPx4LZFUJq9hjDg91Y5+4Zv1+mS1rIAarocauUE\n2wjqey6AsiHBM6Nlq9ajb+tOhpHI5EdqusCqMRiNeI7Y0fTHMImRjYYAP01wbRgh\nfhoh0LZC0iIjndM5rlJ6Zu86YdClUoZN+em9BXTZ3u7PD0msrfp9Q/7WDa5xnbvc\nk7nGj0TDqe+16AxmUnA+y6OMF5XoA7mSh3CMqTx4jQKBgQDziDQjJQ1gwu01WLST\nzb3OCla8uYnHiHPYUBupyViGunLr3VFqKsBWBEPrDEHMudq3MG+jKT/qSxtp94Xp\n7dROG8AH+iO+S6/tw3VQ4ebbBSHnEP4LEWPmcLn/AYSLFShp8vj0Ep7Zd6kOgQka\nqn+1Yf90+uRqIWvMJABnHn7SgwKBgQDkQ8uswYb1zc/oyWD0OhiPBU48sdyff1dC\nMjK3tR/YygBA3uKjw4pZDsihuMP1dv/04kbeBPwTVqB33lb6ydEWJLrLjdd23KUC\nbkMwvZXo/nqv+bh5wwaWbTV8nK69vrIdGEonEmNHeLOsT2yzgTHJXvzUwz6ToPHO\n5ywxkxexUwKBgH2phYWxA9MvIimJyTwPSOZ9jT462u576ZLv2yZkP+rdYJl2jSEk\nSDTaZJVvsLBMIqCuPJzLlzB1awLl91K7Jvba+N7k4va5pWEhn3KJ7o6Lem/546yg\nX5U0C7Wa+eKumzj4aB/BT/hU94YFbUY2PknA9IlPQPfGoRIobZDIOpazAoGAJ8Ba\ntuIY87N80ohHVyDK6BU/c7hxuGD/vCprxKxJOIKtGp72DxjdffbiH6/CiHvJxUam\nmsF5eJCsb1OMCC6fN+D7mrk/3ZY9MjgrgVByy9mNWhn9805wVj/8gY/zql2MPR7e\nwwEjwu2VNJu8TWJhXjUpiI/b1O/BTIvbmWKJTLsCgYEAoeJjdcZr6TQJIqmkdGr0\nIcQuJOtO09ctceQuJBPALHDxuU+3VPE5plTg9Dd55KrW0LlJOqGIqYB7bY2TLWvG\n2r8Xu649hn1+7GlajssWvihj2jH4M+aL/nLSN/Sqj3xmIrJjLesD5dPYW2IcnI9S\nm3xWbLHs/1UwOrKTzLno0CU=\n-----END PRIVATE KEY-----\n",
        client_email: "firebase-adminsdk-zlayw@coderhouse-625e1.iam.gserviceaccount.com",
        client_id: "107634736847020900336",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zlayw%40coderhouse-625e1.iam.gserviceaccount.com"
    },
    mongo: {
        useLocal: false,
        local: {
            url: "mongodb://localhost/coderhouseTP"
        },
        compass: {
            uri: "mongodb+srv://coderhouse:coderhouse@cluster0.8z1uy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
        }
    },
    archivo: {
        carritoURL: "/public/carrito.txt",
        productosURL: "/public/productos.txt"
    }
}
