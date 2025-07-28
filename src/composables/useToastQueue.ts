import { useToast, type ActiveToast } from 'vue-toast-notification'

let activeToastId: ActiveToast

export function useToastQueue() {
  const $toast = useToast()

  function show(message: string, type: 'success' | 'error' = 'success') {
    if (activeToastId) {
      $toast.clear()
    }

    activeToastId = $toast[type](message, {
      duration: 4000,
      position: 'top-right',
    })
  }

  return {
    show,
  }
}
