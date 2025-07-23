<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.back()" />

    <van-search show-action placeholder="请输入搜索关键词" v-model="keyword" clearable>
      <template #action>
        <div @click="goSearch(keyword)">搜索</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div class="search-history" v-if="history.length>0">
      <div class="title">
        <span>最近搜索</span>
        <van-icon name="delete-o" size="16" @click="clearHistory"/>
      </div>
      <div class="list">
        <div class="list-item" v-for="(item ,index) in history" :key="index" @click="goSearch(item)">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import { getHistory, setHistory, removeHistory } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  data () {
    return {
      history: getHistory() || [],
      keyword: ''
    }
  },
  methods: {
    goSearch (item) {
      console.log(item)
      if (this.history.includes(item)) {
        // 将本来的删除，并重新插入在头部
        this.history.splice(this.history.indexOf(item), 1)
      }
      // 将搜索的关键词插入在头部
      this.history.unshift(item)
      // this.keyword = ''

      setHistory(this.history)
      this.$router.push(`/searchlist?keyword=${item}`)
    },
    clearHistory () {
      Dialog.confirm({
        title: '删除历史',
        message: '确定删除历史记录吗？'
      })
        .then(() => {
          this.history = []
          removeHistory()
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }

  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }

  ::v-deep .van-icon-arrow-left {
    color: #333;
  }

  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }

  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }

  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>
