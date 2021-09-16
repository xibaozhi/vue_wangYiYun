<template>
  <div ref="wrapper">
      <slot></slot>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
export default {
    props: {
        probeType: {
            type: Number,
            default: 1
        },
        click: {
            type: Boolean,
            default: true
        },
        direction: {
            type: String,
            default: 'horizontal'
        },
        listenScroll: {
            type: Boolean,
            default: false
        },
        pullup: {
            type: Boolean,
            default: false
        },
        pulldown: {
            type: Boolean,
            default: false
        },
        data: {
            type: [Array, Boolean, Object],
            required: false
        },
        beforeScroll: {
            type: Boolean,
            default: false
        },
        scrollX: {
            type: Boolean,
            default: false
        },
        scrollY: {
            type: Boolean,
            default: true
        }
    },
    mounted () {
        setTimeout(() => {
            this._initScroll()
        }, 20)
    },
    methods: {
        _initScroll() {
            this.scroll = new Bscroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: this.click,
                scrollX: this.scrollX,
                scrollY: this.scrollY,
                eventPassthrough: this.direction 
                // === 'vertical' ? 'vertical' : 'horizontal'
            })

            // 是否派发滚动事件
            if (this.listenScroll) {
                this.scroll.on('scroll', (pos) => {
                    this.$emit('scroll', pos)
                })
            }

            // 是否派发滚动到底部事件，用于上拉加载更多
            if (this.pullup) {
                this.scroll.on('scrollEnd', () => {
                    if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                        this.$emit('scrollToEnd')
                    }
                })
            }

            // 下拉刷新
            if (this.pulldown) {
                this.scroll.on('touhEnd', (pos) => {
                    if (pos.y > 50) {
                        this.$emit('pulldown')
                    }
                })
            }

            // 是否派发滚动开始事件
            if (this.beforeScroll) {
                this.scroll.on('beforeScrollStart', () => {
                    this.$emit('beforeScrroll')
                })
            }
        },
        refresh() {
            this.scroll && this.scroll.refresh()
        }
    },
    watch: {
        data() {
            setTimeout(() => {
                this.refresh()
            }, 20)
        }
    }
}
</script>

<style>

</style>