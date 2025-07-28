import {
  DocumentIcon,
  DocumentTextIcon,
  DocumentChartBarIcon,
  DocumentArrowDownIcon,
  PhotoIcon,
} from '@heroicons/vue/24/outline'

export function useFileHelper() {
  const getFileIcon = (file: File) => {
    const extension = file.name.split('.').pop()?.toLowerCase() || ''

    if (file.type.startsWith('image/')) return PhotoIcon
    if (['xls', 'xlsx', 'csv'].includes(extension)) return DocumentChartBarIcon
    if (['doc', 'docx'].includes(extension)) return DocumentTextIcon
    if (['pdf'].includes(extension)) return DocumentArrowDownIcon

    return DocumentIcon
  }

  const getFileIconClass = (file: File) => {
    const extension = file.name.split('.').pop()?.toLowerCase() || ''

    if (file.type.startsWith('image/')) return 'bg-blue-50 text-blue-600'
    if (['xls', 'xlsx', 'csv'].includes(extension)) return 'bg-green-50 text-green-600'
    if (['doc', 'docx'].includes(extension)) return 'bg-blue-50 text-blue-600'
    if (['pdf'].includes(extension)) return 'bg-red-50 text-red-600'

    return 'bg-gray-100 text-gray-600'
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`
  }

  return {
    getFileIcon,
    getFileIconClass,
    formatFileSize,
  }
}
