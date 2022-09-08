<template>
<div class="singer-wrapper">
  <my-loading v-if="loading" />
  <ul>
    <li
      v-for="group in list"
      :key="group.letter"
      :class="'group group' + group.letter"
    >
      <h2>{{ group.letter }}</h2>
      <ul>
        <li
          v-for="singer in group.list"
          :key="singer.id"
          @click="detail(singer)"
        >
          <!-- <img :src="singer.avatar" /> -->
          <div
            class="avatar"
            :style="{'background-image': `url(${singer.avatar})`}"
          ></div>
          <p>{{ singer.name }}</p>
        </li>
      </ul>
    </li>
  </ul>

  <div class="letter-list">
    <div
      v-for="d in list"
      :key="d.letter"
      @click="onClick(d.letter)"
      :class="{ 'active': d.letter === activeLetter }"
    >{{ d.letter }}</div>
  </div>
  <transition name="detail">
    <router-view />
  </transition>
</div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: true,
      activeLetter: '', // 当前高亮的字母
      heightList: [], // 高度和数组
      isClick: false, // 滚动是否由点击引发
    };
  },
  methods: {
    setGroup(arr) {
      // list是分好组的数组
      const list = [];
      arr.forEach(i => {
        // 找是否存在i.firstLetter字母的分组
        let index = list.findIndex(j => j.letter === i.firstLetter);
        // 如果分组不存在，添加一个分组
        if (index === -1) {
          list.push({
            letter: i.firstLetter,
            list: []
          });
          index = list.length - 1;
        }
        list[index].list.push(i);
      });
      list.sort((a, b) => a.letter.charCodeAt(0) - b.letter.charCodeAt(0));
      this.list = list;
      this.activeLetter = this.list[0].letter;
      // 数据发生变化，视图更新需要时间
      // setTimeout(this.setHeightList, 0);
      // $nextTick表示数据发生变化引发的视图更新已经完成（DOM已经渲染好了）
      this.$nextTick(this.setHeightList);
    },

    onClick(letter) {
      this.isClick = true;
      this.activeLetter = letter;
      document.querySelector('.group' + letter).scrollIntoView();
    },

    setHeightList() {
      const groupList = document.querySelectorAll('.group');
      this.heightList.push(0);
      let h = 0;
      groupList.forEach(group => {
        h += group.getBoundingClientRect().height;
        this.heightList.push(h);
      });
    },

    onScroll({ target }) {
      // 点击右侧引发的滚动就不比对处理了
      if (this.isClick) {
        // this.isClick = false;
        // return;
        return this.isClick = false;
      }
      // const st = event.target.scrollTop;
      const { scrollTop: st } = target;
      this.heightList.forEach((item, index, arr) => {
        if (st >= item && st < arr[index + 1]) {
          this.activeLetter = this.list[index].letter;
        }
      });
    },

    detail({ copyright, id }) {
      // 歌手有字段copyright为true才有详情
      if (!copyright) return alert('无版权');
      this.$router.push('/singer/' + id);
    }
  },
  created() {
    // this是组件实例，就是通过new Vue()创建出来的，Vue是构造函数，它的prototype上的方法会让所有的实例共享
    this.request('/singer-list').then(({ data }) => {
      this.setGroup(data);
      this.loading = false;
    });
  },

  mounted() {
    document.querySelector('main').addEventListener('scroll', this.onScroll);
  },

  beforeDestroy() {
    document.querySelector('main').removeEventListener('scroll', this.onScroll);
  }
};
</script>

<style lang="sass">
.singer-wrapper
  padding: .4rem 0
  h2
    line-height: .6rem
    text-indent: .2rem
    font-size: .32rem
    background-color: #061842
    background: linear-gradient(15deg, #061842, #2c50a1)
  ul
    ul
      padding: .2rem
      li
        display: flex
        align-items: center
        padding: .1rem 0
        p
          flex: 1
          padding-left: .24rem
  .avatar
    width: .8rem
    height: .8rem
    border-radius: 50%
    background-repeat: no-repeat
    background-position: center
    background-size: cover

  .letter-list
    position: fixed
    top: 2.4rem
    right: .2rem
    div
      width: .4rem
      line-height: .4rem
      text-align: center
      opacity: .4
      cursor: pointer
      &.active
        opacity: 1

.detail-enter,
.detail-leave-to
  transform: translateX(100%)
.detail-enter-active,
.detail-leave-active
  transition: .3s
</style>
