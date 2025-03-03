<template>
    <div class="select-container space-y-2 w-100">
        <label class="text-md font-medium text-gray-700" :for="label">{{ label }}</label>
        <select
            :id="label"
            :value="modelValue"
            @input="onInputChange"
            :class="[
                'w-full p-2 border rounded-md shadow-sm focus:outline-none',
                'focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',
                'text-gray-900 bg-white placeholder-gray-500',
                'border-gray-300'
            ]"
        >
            <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps<{
    modelValue: string;
    label: string;
    options: string[];
}>();

const emitUpdate = (value) => {
    emit("update:modelValue", value);
};

const onInputChange = (event) => {
    emitUpdate(event.target.value);
};

onMounted(() => {
    if (!props.modelValue && props.options.length > 0) {
        emit("update:modelValue", props.options[0]);
    }
});
</script>
