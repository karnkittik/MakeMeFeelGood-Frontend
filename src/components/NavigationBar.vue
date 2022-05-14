<template>
  <a-layout-header class="my-header">
    <div class="my-date">
      <a-popover
        placement="bottomLeft"
        trigger="click"
        v-model:visible="showCalendar"
        class="my-popover"
      >
        <template #content>
          <div class="my-date-picker-block">
            <a-calendar
              v-if="showCalendar"
              v-model:value="date"
              :fullscreen="false"
              :disabled-date="disabledDate"
              @change="onClick"
            />
          </div>
        </template>
        <a-button class="calendar-button" type="ghost" shape="circle">
          <template #icon>
            <CalendarOutlined style="font-size: 20px; color: rgb(69, 16, 69)" />
          </template>
        </a-button>
        <a-typography-title :level="4" class="my-text">
          {{ formatDate }}
        </a-typography-title>
        <edit-outlined class="edit-icon" />
      </a-popover>
    </div>
    <a-typography-title :level="3" class="logo-text">
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
import { CalendarOutlined, EditOutlined } from "@ant-design/icons-vue";
import { defineComponent, ref, computed } from "vue";
export default defineComponent({
  props: {
    changeDate: Function,
  },
  setup(props) {
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
      // console.log(date.value.toString());
      props.changeDate(date.value);
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
    EditOutlined,
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
.my-popover {
  display: flex !important;
  align-items: center !important;
  cursor: pointer;
}
.my-date {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.my-text {
  color: rgb(69, 16, 69) !important;
  margin: 0 0 0 10px !important;
  font-weight: 500 !important;
}
.logo-text {
  background: -webkit-linear-gradient(
    #03001e,
    #7303c0,
    #ec38bc,
    #fdeff9
  ) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  margin: 0 !important;
  font-weight: 700 !important;
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
.edit-icon {
  display: none !important;
  color: gray !important;
}
.ant-popover {
  z-index: 0 !important;
  position: fixed !important;
}
@media screen and (max-width: 768px) {
  .calendar-button {
    width: 36px !important;
    height: 36px !important;
    display: none !important;
  }
}
@media screen and (max-width: 576px) {
  .my-text {
    margin: 0 5px 0 0 !important;
  }
  .edit-icon {
    display: inline-block !important;
  }
}
</style>
