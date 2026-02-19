// stores/useCurrencyStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const SUPPORTED_CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
]

// Free tier: https://www.exchangerate-api.com  OR  https://open.er-api.com
// Replace with your actual API key and provider
const RATES_API_URL = 'https://open.er-api.com/v6/latest'

export const useCurrencyStore = defineStore('currency', () => {
  // ── State ────────────────────────────────────────────────────────────────
  const selectedCurrency = ref(
    localStorage.getItem('preferredCurrency') || 'USD'
  )
  // rates are always relative to USD (base)
  // e.g. { EUR: 0.92, GBP: 0.79, NGN: 1580, USD: 1 }
  const rates = ref({})
  const baseCurrency = ref('USD') // the currency your API returns prices in
  const loading = ref(false)
  const error = ref(null)
  const lastFetched = ref(null)

  // ── Getters ──────────────────────────────────────────────────────────────
  const currencies = computed(() => SUPPORTED_CURRENCIES)

  const currentCurrency = computed(() =>
    SUPPORTED_CURRENCIES.find((c) => c.code === selectedCurrency.value)
  )

  const isReady = computed(() => Object.keys(rates.value).length > 0)

  // ── Actions ──────────────────────────────────────────────────────────────

  /**
   * Fetch live rates from the exchange-rate API.
   * Caches for 1 hour to avoid hammering the free tier.
   */
  async function fetchRates() {
    const ONE_HOUR = 60 * 60 * 1000
    if (lastFetched.value && Date.now() - lastFetched.value < ONE_HOUR) return

    loading.value = true
    error.value = null

    try {
      // Base is USD. Adjust if your backend returns prices in a different currency.
      const res = await fetch(`${RATES_API_URL}/USD`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()

      // open.er-api.com shape: { rates: { EUR: 0.92, GBP: 0.79, ... } }
      // exchangerate-api.com shape: { conversion_rates: { ... } }
      rates.value = data.rates ?? data.conversion_rates ?? {}
      lastFetched.value = Date.now()
    } catch (err) {
      error.value = err.message
      console.error('[CurrencyStore] Failed to fetch rates:', err)

      // Fallback hardcoded rates so the UI never breaks
      rates.value = { USD: 1, EUR: 0.92, GBP: 0.79, NGN: 1580 }
    } finally {
      loading.value = false
    }
  }

  /**
   * Convert a price from baseCurrency (USD) to the selected currency.
   * @param {number} amount — price in base currency (USD)
   * @returns {number}
   */
  function convert(amount) {
    if (!amount || !isReady.value) return amount
    const rate = rates.value[selectedCurrency.value] ?? 1
    return amount * rate
  }

  /**
   * Format a price: convert + locale-aware formatting.
   * @param {number} amount — price in base currency (USD)
   * @param {object} opts  — Intl.NumberFormat options override
   * @returns {string}     e.g. "₦1,580,000.00"
   */
  function format(amount, opts = {}) {
    const converted = convert(amount)
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: selectedCurrency.value,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      ...opts,
    }).format(converted)
  }

  function setCurrency(code) {
    if (!SUPPORTED_CURRENCIES.find((c) => c.code === code)) return
    selectedCurrency.value = code
    localStorage.setItem('preferredCurrency', code)
  }

  return {
    // state
    selectedCurrency,
    rates,
    baseCurrency,
    loading,
    error,
    // getters
    currencies,
    currentCurrency,
    isReady,
    // actions
    fetchRates,
    convert,
    format,
    setCurrency,
  }
})