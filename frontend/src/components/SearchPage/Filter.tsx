import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { useSearchParams } from 'react-router-dom'
import { useCallback } from 'react'

const FormSchema = z.object({
  searchBy: z.string()
})

export default function Filter() {
  const [searchParams, setSearchParams] = useSearchParams()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setSearchParams(createQueryString('searchBy', data.searchBy))
  }

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-3'>
        <FormField
          control={form.control}
          name='searchBy'
          defaultValue={searchParams.get('searchBy') || 'title'}
          render={({ field }) => (
            <FormItem className='space-y-5'>
              <FormLabel>
                <p className='text-sm font-semibold px-6'>Search</p>
              </FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className='flex flex-col gap-1'>
                  <FormItem className='flex justify-between items-center space-x-3 space-y-0 cursor-pointer hover:bg-secondary pr-2 mx-4 rounded-lg'>
                    <FormLabel className='font-normal flex-1 cursor-pointer p-2 pr-0'>By title</FormLabel>
                    <FormControl>
                      <RadioGroupItem value='title' />
                    </FormControl>
                  </FormItem>
                  <FormItem className='flex justify-between items-center space-x-3 space-y-0 cursor-pointer hover:bg-secondary pr-2 mx-4 rounded-lg'>
                    <FormLabel className='font-normal flex-1 cursor-pointer p-2 pr-0'>By description</FormLabel>
                    <FormControl>
                      <RadioGroupItem value='description' />
                    </FormControl>
                  </FormItem>
                  <FormItem className='flex justify-between items-center space-x-3 space-y-0 cursor-pointer hover:bg-secondary pr-2 mx-4 rounded-lg'>
                    <FormLabel className='font-normal flex-1 cursor-pointer p-2 pr-0'>By tags</FormLabel>
                    <FormControl>
                      <RadioGroupItem value='tags' />
                    </FormControl>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='grid place-items-center'>
          <Button type='submit' size='sm' className='rounded-full text-xs font-semibold'>
            Apply
          </Button>
        </div>
      </form>
    </Form>
  )
}
