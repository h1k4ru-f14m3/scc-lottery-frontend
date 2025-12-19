<script setup>
const props = defineProps({
  extraClasses: String,
  theads: {
    type: Array,
    default: () => [],
  },
  trows: {
    type: Array,
    default: () => [],
  },
  code_id_index: {
    type: Number,
    default: 0,
  },
  use_extra_components: {
    type: Boolean,
    default: false,
  },
  extra_components: {
    type: Array,
    default: () => [
      {
        component: Object,
        props: () => {},
        key: String,

        dataSource: 'row',
        dataList: [],
      },
    ],
  },
  disable_func: {
    type: Function,
    default: () => {
      return false
    },
  },
})
</script>

<template>
  <div class="overflow-x-auto rounded-box border-2 border-base-200 rounded-md">
    <table class="table" :class="props.extraClasses">
      <thead>
        <tr>
          <th v-for="header in props.theads">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in props.trows">
          <td v-for="(data, i) in item" :key="data + '-' + i">
            {{ i === props.code_id_index ? String(data).padStart(5, '0') : data }}
          </td>

          <td v-for="extra in props.extra_components" v-if="props.use_extra_components">
            <component
              v-if="extra.dataSource === 'row'"
              :is="extra.component"
              v-bind="{
                ...extra.props,
                [extra.key]: item[props.code_id_index],
                disableBTN: props.disable_func(item),
              }"
            ></component>
            <component
              v-else
              :is="extra.component"
              v-bind="{
                ...extra.props,
                [extra.key]: extra.dataList[index],
                disableBTN: props.disable_func(item),
              }"
            ></component>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
