<template>
    <div class="input-group space-y-2 w-100">
        <label class="text-md font-medium text-gray-700">{{ label }}</label>
        <input
            :value="modelValue"
            :type="type"
            :placeholder="placeholder"
            @input="updateValue"
            @blur="$emit('blur')"
            :class="[
                'w-full p-2 border rounded-md shadow-sm focus:outline-none',
                'focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',
                'text-gray-900 placeholder-gray-500',
                error ? 'border-red-500' : 'border-gray-300'
            ]"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
    modelValue: string;
    label: string;
    placeholder: string;
    type: string;
    error?: boolean | undefined;
}>();
const emit = defineEmits(["update:modelValue", "blur"]);

const updateValue = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit("update:modelValue", target.value);
};

watch(
    () => props.modelValue,
    (newValue) => {
        emit("update:modelValue", newValue);
    }
);
</script>
