import { Check, ChevronsUpDown } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList
} from '@/components/ui/command';
import {
	Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';

const languages = [
	{ label: "English", value: "en" },
	{ label: "French", value: "fr" },
	{ label: "German", value: "de" },
	{ label: "Spanish", value: "es" },
	{ label: "Portuguese", value: "pt" },
	{ label: "Russian", value: "ru" },
	{ label: "Japanese", value: "ja" },
	{ label: "Korean", value: "ko" },
	{ label: "Chinese", value: "zh" },
] as const

const formSchema = z.object({
	username: z.string().min(2).max(50),
	language: z.string({
		required_error: "Please select a language.",
	}),
	sourceCode: z
		.string()
		.min(10, {
			message: "Bio must be at least 10 characters.",
		})
		.max(160, {
			message: "Bio must not be longer than 30 characters.",
		}),
	stdin: z
		.string()
		.min(10, {
			message: "Bio must be at least 10 characters.",
		})
		.max(160, {
			message: "Bio must not be longer than 30 characters.",
		}),
})

const Details = () => {
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
		},
	})

	// 2. Define a submit handler.
	function onSubmit(data: z.infer<typeof formSchema>) {
		console.log(data)
		toast({
			title: "You submitted the following values:",
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		})
	}
	return (
		<div className='w-3/5 mx-auto mt-20 border border-black p-6 rounded'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input placeholder="johnDoe" {...field} />
								</FormControl>
								<FormDescription>
									This is your public display name.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="language"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Language</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant="outline"
												role="combobox"
												className={cn(
													"w-[200px] justify-between",
													!field.value && "text-muted-foreground"
												)}
											>
												{field.value
													? languages.find(
														(language) => language.value === field.value
													)?.label
													: "Select language"}
												<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-[200px] p-0">
										<Command>
											<CommandInput placeholder="Search language..." />
											<CommandList>
												<CommandEmpty>No language found.</CommandEmpty>
												<CommandGroup>
													{languages.map((language) => (

														<CommandItem
															value={language.label}
															key={language.value}
															onSelect={() => {
																form.setValue("language", language.value)
															}}
														>
															<Check
																className={cn(
																	"mr-2 h-4 w-4",
																	language.value === field.value
																		? "opacity-100"
																		: "opacity-0"
																)}
															/>
															{language.label}
														</CommandItem>
													))}
												</CommandGroup>
											</CommandList>
										</Command>
									</PopoverContent>
								</Popover>
								<FormDescription>
									This is the language that will be used in the dashboard.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="stdin"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Standard Input</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Give your standard input"
										className="resize-none"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									You can give your standard input here.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="sourceCode"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Source Code</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Give your Source code"
										className="resize-none"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Give your source code in here.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</div>
	)
}

export default Details