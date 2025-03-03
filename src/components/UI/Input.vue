<template>
    <div class="input-group">
        <label>{{ label }}</label>
        <input
            :value="modelValue"
            :type="type"
            :placeholder="placeholder"
            @input="updateValue"
            @blur="handleBlur"
            :class="{ invalid: invalid && touched }"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
    modelValue: { type: String; required: true };
    label: { type: String; required: true };
    placeholder: { type: String; required: true };
    type: { type: String; default: "text" };
    touched: { type: Boolean; default: false };
    invalid: { type: Boolean; default: false };
}>();
const emit = defineEmits(["update:modelValue"]);

const touched = ref(props.touched);

const handleBlur = () => {
    touched.value = true;
};

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
