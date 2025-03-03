<template>
    <div class="select-container">
        <label :for="label">{{ label }}</label>
        <select :id="label" :value="modelValue" @input="onInputChange">
            <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps<{
    modelValue: {
        type: String;
        required: true;
    };
    label: {
        type: String;
        required: true;
    };
    options: {
        type: Array;
        required: true;
    };
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
