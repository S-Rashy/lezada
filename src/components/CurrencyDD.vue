<template>
  <!-- CurrencyDropdown.vue — drop into your footer -->
  <div class="currency-dropdown">
    <!-- <label for="currency-select" class="currency-label">
      <span class="globe-icon" aria-hidden="true">🌐</span>
      Currency
    </label> -->

    <div class="select-wrapper">
      <select
        id="currency-select"
        :value="selectedCurrency"
        :disabled="loading"
        class="currency-select"
        aria-label="Select currency"
        @change="onChangeCurrency"
      >
        <option
          v-for="currency in currencies"
          :key="currency.code"
          :value="currency.code"
        >
          {{ currency.symbol }} {{ currency.code }}
        </option>
      </select>

      <!-- Spinner shown while fetching rates -->
      <span v-if="loading" class="spinner" aria-label="Loading rates…" />
      <span v-else class="chevron" aria-hidden="true">▾</span>
    </div>

    <p v-if="error" class="currency-error" role="alert">
      ⚠ Using fallback rates
    </p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCurrency } from '@/helpers/useCurrency';

const { selectedCurrency, currencies, loading, error, setCurrency, fetchRates } =
  useCurrency()

// Fetch rates when the footer mounts (once per session, cached 1 hour)
onMounted(() => fetchRates())

function onChangeCurrency(event) {
  setCurrency(event.target.value)
}
</script>

<style scoped>
.currency-dropdown {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.currency-label {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: inherit;
  opacity: 0.75;
  white-space: nowrap;
}

.select-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.currency-select {
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
  border: 1px solid currentColor;
  /* border-radius: 0.375rem; */
  color: inherit;
  cursor: pointer;
  font-size: inherit;
  opacity: 0.9;
  padding: 13px 30px;
  transition: opacity 0.15s;
}

.currency-select:hover {
  opacity: 1;
}

.currency-select:focus {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.currency-select:disabled {
  cursor: wait;
  opacity: 0.5;
}

/* Custom chevron / spinner, positioned inside the select */
.chevron,
.spinner {
  pointer-events: none;
  position: absolute;
  right: 0.5rem;
}

.spinner {
  animation: spin 0.7s linear infinite;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  height: 0.8rem;
  width: 0.8rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.currency-error {
  color: #f87171;
  font-size: 0.75rem;
  margin: 0;
}
</style>