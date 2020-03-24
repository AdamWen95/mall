<template>
    <div class="recommend">
        <div v-for="(item, index) in recommends" :key="index" class="recommend-item">
            <a :href="item.link">
                <img :src="item.image" alt="">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: "RecommendView",
    props: {
        recommends: {
            type: Array,
            defult() {
                return []
            }
        }
    }
}
</script>

<style scoped>
.recommend {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    border-bottom: 10px solid #eee;
    padding: 10px 0 20px;
}

.recommend-item {
    flex: 1;
}

.recommend-item img {
width: 85%;
margin-bottom: 10px;
}
</style>