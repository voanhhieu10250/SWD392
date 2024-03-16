import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCallback } from "react";

const FormSchema = z.object({
  show: z.enum(["artwork", "category"], {
    required_error: "You need to select a notification type.",
  }),
});

export default function Filter({
  defaultValue = "artwork",
}: {
  defaultValue?: "artwork" | "category";
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  function onSubmit(data: z.infer<typeof FormSchema>) {
    router.push(pathname + "?" + createQueryString("show", data.show));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
        <FormField
          control={form.control}
          name="show"
          defaultValue={defaultValue}
          render={({ field }) => (
            <FormItem className="space-y-5">
              <FormLabel>
                <p className="text-sm font-semibold px-6">Show</p>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col gap-1"
                >
                  <FormItem className="flex justify-between items-center space-x-3 space-y-0 cursor-pointer hover:bg-secondary pr-2 mx-4 rounded-lg">
                    <FormLabel className="font-normal flex-1 cursor-pointer p-2 pr-0">
                      Artwork
                    </FormLabel>
                    <FormControl>
                      <RadioGroupItem value="artwork" />
                    </FormControl>
                  </FormItem>
                  <FormItem className="flex justify-between items-center space-x-3 space-y-0 cursor-pointer hover:bg-secondary pr-2 mx-4 rounded-lg">
                    <FormLabel className="font-normal flex-1 cursor-pointer p-2 pr-0">
                      Category
                    </FormLabel>
                    <FormControl>
                      <RadioGroupItem value="category" />
                    </FormControl>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid place-items-center">
          <Button
            type="submit"
            size="sm"
            className="rounded-full text-xs font-semibold"
          >
            Apply
          </Button>
        </div>
      </form>
    </Form>
  );
}
