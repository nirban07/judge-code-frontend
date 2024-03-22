
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';

const languages = [
	{
		"id": 54,
		"name": "C++ (GCC 9.2.0)",
		"label": "C++ (GCC 9.2.0)",
		"value": "c++"
	},
	{
		"id": 63,
		"name": "JavaScript (Node.js 12.14.0)",
		"label": "JavaScript (Node.js 12.14.0)",
		"value": "javascript"
	},
	{
		"id": 60,
		"name": "Go (1.13.5)",
		"label": "Go (1.13.5)",
		"value": "go"
	},
	{
		"id": 71,
		"name": "Python (3.8.1)",
		"label": "Python (3.8.1)",
		"value": "Python"
	},
] as const

const formSchema = z.object({
	username: z.string().min(2).max(50),
	languages: z
		.string({
			required_error: "Please select a language",
		}),
	sourceCode: z.string({
		required_error: "source code cannot be empty"
	}).min(1),
	stdin: z.string(),
})

const Details = () => {
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
		},
	})

	const { toast } = useToast()

	// 2. Define a submit handler.
	async function onSubmit(data: z.infer<typeof formSchema>) {
		// console.log(data)
		const response = await fetch(import.meta.env.VITE_PROD_URL, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json' // Set content type to JSON
			},
			body: JSON.stringify(data)
		})
		const res = await response.json()

		toast({
			title: "This is the output",
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{res.stdout}</code>
				</pre>
			)
		})
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
		<div className='w-1/2 mx-auto mt-20 border border-black p-6 rounded'>
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
						name="languages"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Language</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select Language" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>

										{languages.map((language) => (
											<SelectItem key={language.id} value={`${language.id}`}>{language.name}</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormDescription>
									{/* You can manage email addresses in your{" "}
									<Link href="/examples/forms">email settings</Link>. */}
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
										required={false}
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
			<Toaster />
		</div>
	)
}

export default Details