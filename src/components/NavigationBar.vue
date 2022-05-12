<template>
  <a-layout-header class="my-header">
    <div class="my-date">
      <a-popover
        placement="bottomLeft"
        trigger="click"
        v-model:visible="showCalendar"
      >
        <template #content>
          <div class="my-date-picker-block">
            <a-calendar
              v-if="showCalendar"
              v-model:value="date"
              :fullscreen="false"
              :disabled-date="disabledDate"
              @select="onClick"
            />
          </div>
        </template>
        <a-button
          class="calendar-button"
          type="ghost"
          shape="circle"
          @click="onClick"
        >
          <template #icon>
            <CalendarOutlined style="font-size: 20px" />
          </template>
        </a-button>
      </a-popover>
      <a-typography-title
        :level="4"
        class="my-text"
        style="margin-left: 10px !important"
      >
        {{ formatDate }}
      </a-typography-title>
    </div>
    <a-typography-title :level="4" class="my-text">
      MakeMeFeelGood
    </a-typography-title>
  </a-layout-header>
</template>
<script>
import dayjs from "dayjs";
import moment from "moment";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
dayjs.extend(isToday);
dayjs.extend(isYesterday);
import { CalendarOutlined } from "@ant-design/icons-vue";
import { defineComponent, ref, computed } from "vue";
export default defineComponent({
  setup() {
    const date = ref(dayjs());
    const showCalendar = ref(false);

    const formatDate = computed(() => {
      if (date.value.isToday()) {
        return "Today";
      } else if (date.value.isYesterday()) {
        return "Yesterday";
      } else {
        return date.value.format("MMM D, YYYY");
      }
    });

    const disabledDate = (current) => {
      // Can not select days after today
      return current > moment().endOf("day");
    };

    const onClick = () => {
      showCalendar.value = !showCalendar.value;
      console.log(date.value.toString());
    };

    return {
      date,
      formatDate,
      showCalendar,
      disabledDate,
      onClick,
    };
  },
  components: {
    CalendarOutlined,
  },
});
</script>
<style>
.my-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 36px 0px !important;
  background: #f0f2f5 !important;
}

.my-date {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.my-text {
  color: black !important;
  margin: 0 !important;
}
.my-date-picker-block {
  width: 300px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}
.calendar-button {
  width: 48px !important;
  height: 48px !important;
}
@media screen and (max-width: 768px) {
  .calendar-button {
    width: 36px !important;
    height: 36px !important;
  }
}
</style>
