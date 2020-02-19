/**
 * add Router support
 */

export default {
    props: {
        url: String,
        replace: Boolean,
        to: [String, Object]
    },

    methods: {
        routerLink() {
            if (this.to) {
                if (this.replace) {
                    uni.redirectTo({
                        url: this.to
                    })
                } else {
                    uni.navigateTo({
                        url: this.to
                    })
                }
            }
            if (this.url) {
                uni.navigateTo({
                    url: this.url
                })
            }
        }
    }
}
