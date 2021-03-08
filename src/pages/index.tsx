import CircularProgress from '@material-ui/core/CircularProgress';
import redirectUnauthorizedToLogin from "../components/helpers/redirectUnauthorizedToLogin";
import {FlexBlock} from "../components/styled";
import TextField from "@material-ui/core/TextField";
import {useCallback, useState} from "react";
import Button from "@material-ui/core/Button";
import request from "../components/helpers/request";
import styled from 'styled-components'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Layout from "../components/Layout";
import {NextPageContext} from "next";


const GalleryImg = styled.img`
  width: auto;
  height: auto;
`

const EnhancedIcon = styled(FavoriteBorderIcon)`
  cursor: pointer;
`

export type PhotoItem = {
	url: string;
	id: string;
	isLiked: boolean;
}

export default function Home() {
	const [searchString, setSearchString] = useState('')
	const [items, setItems] = useState<Array<PhotoItem>>([])
	const [loading, setLoading] = useState(false)
	const onSearch = useCallback(() => {
		if (searchString) {
			setLoading(true)
			request({
				url: `/api/images?search=${searchString}`,
			}).then(newItems => {
				if (newItems.length) {
					setItems(newItems)
				}
				setLoading(false)
			})
		}
	}, [searchString, setItems, setLoading])
	const onLike = (id: string, isLiked: boolean) => {
		request({
			url: `/api/likes`,
			method: isLiked ? 'DELETE' : 'POST',
			body: {
				id
			}
		}).then(() => {
			const newItems = [...items]
			const clickedItem = newItems.find(({id: imageId}) => id === imageId)
			if (clickedItem) {
				clickedItem.isLiked = !clickedItem.isLiked
			}
			setItems(newItems)
		})
	}

	return (
			<Layout>
				<FlexBlock alignCenter m={[30]} wAbs={500}>
					<FlexBlock grow>
						<TextField
								label="Search"
								onChange={({target}) => setSearchString(target.value)}
								name={'search'}
								value={searchString}
								fullWidth={true}
								variant="outlined"
						/>
					</FlexBlock>
					<FlexBlock m={[0, 0, 0, 15]}>
						<Button variant={'contained'} color="primary" onClick={onSearch}>
							Find images
						</Button>
					</FlexBlock>
				</FlexBlock>
				<FlexBlock alignCenter>
					{loading ?
							<CircularProgress/> : items.map(({url, id, isLiked}, index) => {
								return (
										<FlexBlock key={index} column m={20}>
											<GalleryImg src={url}/>
											<FlexBlock justifyCenter>
												<EnhancedIcon
														color={isLiked ? 'secondary' : 'primary'}
														onClick={() => onLike(id, isLiked)}
												/>
											</FlexBlock>
										</FlexBlock>
								)
							})
					}
				</FlexBlock>
			</Layout>
	)
}

export async function getServerSideProps(context: NextPageContext) {
	redirectUnauthorizedToLogin(context);
	return {
		props: {}
	};
}
