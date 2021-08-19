import BlogCard from '../../components/BlogCard';
import BlogHeader from '../../components/BlogHeader';
import BlogAside from '../../components/BlogAside';
import blog from '../../styles/Blog.module.css';
// import fetch from 'isomorphic-fetch';
import { useRouter } from 'next/router';

import {
	Card,
	CardActions,
	CardActionArea,
	CardContent,
	CardHeader,
	CardMedia,
	Button,
	Typography,
	Grid,
} from '@material-ui/core';
import Head from 'next/head';

const BlogList = ({ posts }) => {
	const router = useRouter();
	console.log(posts);
	return (
		<>
			<section className={blog.blogMain}>
				<Head>
					<title>Blog | shuttlelane.com</title>
					<meta
						name='viewport'
						content='initial-scale=1.0, width=device-width'
					/>
				</Head>
				<Grid container spacing={5} className={blog.cards}>
					{[
						{
							heading: 'title goes here',
							postDescription:
								'title goes here also your description ',
						},
						{
							heading: 'title goes here',
							postDescription:
								'title goes here also your description ',
						},
					]?.map((post) => {
						return (
							<Grid key={post._id} item xs={12} sm={5}>
								{console.log(post)}
								<BlogCard post={post} />
							</Grid>
						);
					})}
				</Grid>
				<BlogAside />
			</section>
		</>
	);
};

export default BlogList;
