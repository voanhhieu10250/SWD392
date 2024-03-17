import React, { useState } from 'react'
import axiosInstance from '~/utils/axios'

function UploadArt() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string>('')

  const [artName, setArtName] = useState('')
  const [artDescription, setArtDescription] = useState('')
  const [artType, setArtType] = useState('')
  const [artPaying, setArtPaying] = useState('')
  const [artPrice, setArtPrice] = useState('')

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setFileName(file.name)
    }
  }

  const handleClearImage = () => {
    setSelectedFile(null)
    setFileName('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedFile) {
      alert('Please select a file')
      return
    }

    const formData = new FormData()
    formData.append('file', selectedFile)
    formData.append('artName', artName)
    formData.append('artDescription', artDescription)
    formData.append('artType', artType)
    formData.append('artPaying', artPaying)

    if (artPaying === 'paid') {
      formData.append('artPrice', artPrice)
    }

    try {
      const response = await axiosInstance.post('/arts/ ', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      console.log(response.data)
      alert('Art uploaded successfully!')
      // Clear form or manage state as needed after successful upload
    } catch (error) {
      console.error('Upload error:', error)
      alert('An error occurred. Please try again.')
    }
  }

  return (
    <div className='max-w-xl mx-auto'>
      <form action='/upload' onSubmit={handleSubmit} method='post'>
        <div className='mb-2'>
          <label
            htmlFor='dropzone-file'
            className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
          >
            <div className='flex flex-col items-center justify-center pt-5 pb-6'>
              <svg
                className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 16'
              >
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                />
              </svg>
              <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                <span className='font-semibold'>Click to upload</span> or drag and drop
              </p>
              <p className='text-xs text-gray-500 dark:text-gray-400'>SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input id='dropzone-file' type='file' className='hidden' onChange={handleFileSelect} />
          </label>
          {selectedFile && (
            <div>
              <img src={URL.createObjectURL(selectedFile)} alt='Uploaded' />
              <p>File Name: {fileName}</p>
              <button
                onClick={handleClearImage}
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              >
                Clear Image
              </button>
            </div>
          )}
        </div>

        <div className='mb-4'>
          <label htmlFor='artName' className='block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2'>
            Art Name
          </label>
          <input
            id='artName'
            type='text'
            value={artName}
            onChange={(e) => setArtName(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            placeholder='Enter art name'
            required
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='artDescription' className='block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2'>
            Art Description
          </label>
          <textarea
            id='artDescription'
            value={artDescription}
            onChange={(e) => setArtDescription(e.target.value)}
            className='shadow resize-none appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            placeholder='Enter art description'
            required
          ></textarea>
        </div>

        <div className='mb-4'>
          <span className='block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2'>Art Type</span>
          <label htmlFor='digitalArt' className='inline-flex items-center mr-4'>
            <input
              type='radio'
              id='digitalArt'
              value='digital'
              checked={artType === 'digital'}
              onChange={() => setArtType('digital')}
              className='form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out'
            />
            <span className='ml-2'>Digital Art</span>
          </label>
          <label htmlFor='physicalArt' className='inline-flex items-center'>
            <input
              type='radio'
              id='physicalArt'
              value='physical'
              checked={artType === 'physical'}
              onChange={() => setArtType('physical')}
              className='form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out'
            />
            <span className='ml-2'>Physical Art</span>
          </label>
        </div>

        <div className='mb-4'>
          <span className='block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2'>Art Price</span>
          <label htmlFor='freeArt' className='inline-flex items-center mr-4'>
            <input
              type='radio'
              name='free'
              id='freeArt'
              value='free'
              checked={artPaying === 'free'}
              onChange={() => setArtPaying('free')}
              className='form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out'
            />
            <span className='ml-2'>Free</span>
          </label>
          <label htmlFor='paidArt' className='inline-flex items-center'>
            <input
              type='radio'
              name='paid'
              id='paidArt'
              value='paid'
              checked={artPaying === 'paid'}
              onChange={() => setArtPaying('paid')}
              className='form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out'
            />
            <span className='ml-2'>Paid</span>
          </label>
          {artPaying === 'paid' && (
            <div className='mt-2'>
              <label htmlFor='artPrice' className='block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2'>
                Price (USD)
              </label>
              <div className='flex items-center'>
                <span className='text-gray-700 dark:text-gray-300 mr-2'>$</span>
                <input
                  type='number'
                  value={artPrice}
                  onChange={(e) => setArtPrice(e.target.value)}
                  className='shadow appearance-none border rounded w-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  placeholder='Enter price'
                  required
                />
              </div>
            </div>
          )}
        </div>

        <div className='flex justify-center'>
          <button
            type='submit'
            className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default UploadArt
