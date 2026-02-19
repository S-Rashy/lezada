// composables/useCurrency.js
import { storeToRefs } from 'pinia'
import { useCurrencyStore } from '@/stores/currency'

/**
 * Composable that exposes currency helpers to any component.
 *
 * Usage:
 *   const { format, convert, selectedCurrency, loading } = useCurrency()
 *   format(product.price)       // "₦1,580,000.00"
 *   convert(product.price)      // 1580000 (raw number)
 */
export function useCurrency() {
  const store = useCurrencyStore()
  const { selectedCurrency, currentCurrency, currencies, loading, error, isReady } =
    storeToRefs(store)

  return {
    // reactive refs
    selectedCurrency,
    currentCurrency,
    currencies,
    loading,
    error,
    isReady,
    // methods (not refs — call directly)
    format: store.format,
    convert: store.convert,
    setCurrency: store.setCurrency,
    fetchRates: store.fetchRates,
  }
}