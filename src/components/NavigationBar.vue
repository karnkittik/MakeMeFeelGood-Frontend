<template>
  <a-layout-header>
    <a-layout-content>
      <a-row>
        <a-col :span="12" align="start">
          <a-button class="calendar-button" type="primary" shape="circle" v-on:click="onClick">
            <template #icon>
              <CalendarOutlined />
            </template>
          </a-button>
          <a-typography-text :style="{color: '#ffffff', padding: '8px'}"> {{ formatDate }} </a-typography-text>
          <a-calendar :class="showCalendar ? 'show-calendar' : 'hide-calendar'" v-model:value="date" :fullscreen="false" :disabled-date="disabledDate" @select="onSelect"/>
        </a-col>
        <a-col :span="12" align="end">
          <a-typography-text :style="{color: '#ffffff', padding: '8px'}"> MakeMeFeelGood </a-typography-text>
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout-header>
</template>
<script>
import dayjs from 'dayjs';
import moment from 'moment';
import isToday from 'dayjs/plugin/isToday';
dayjs.extend(isToday)
import { CalendarOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref, computed } from 'vue';
export default defineComponent({
  setup() {
    const date = ref(dayjs());
    const showCalendar = ref(false);
    
    const formatDate = computed(() => {
      var dateValue = date.value.get('date')
      var monthValue = date.value.get('month')
      var yearValue = date.value.get('year')
      return date.value.isToday() ? "Today" : `${String(dateValue).padStart(2, '0')}/${String(monthValue+1).padStart(2, '0')}/${String(yearValue)}`
    })

    const disabledDate = current => {
      // Can not select days after today
      return current > moment().endOf('day');
    };

    const onClick = () => {
      showCalendar.value = !showCalendar.value
      // console.log(showCalendar.value);
    }

    const onSelect = () => {
      console.log(date.value.toString());
    };

    return {
      date,
      formatDate,
      showCalendar,
      disabledDate,
      onClick,
      onSelect
    };
  },
  components: {
    CalendarOutlined
  }
});
</script>
<style>
.show-calendar {
  visibility: visible;
  width: 100%;
}
.hide-calendar {
  width: 0px !important;
  height: 0px !important;
  visibility: hidden;
}
.calendar-button {
  width: 48px !important;
  height: 48px !important;
}
@media screen and (max-width: 768px) {
  .show-calendar {
    width: 200%;
  }
}
</style>
