import Head from 'next/head'
import redirectUnauthorizedToLogin from "../components/helpers/redirectUnauthorizedToLogin";
import {FlexBlock} from "../components/styled";
import TextField from "@material-ui/core/TextField";
import {useState} from "react";
import Button from "@material-ui/core/Button";
import request from "../components/helpers/request";
import getConfig from "next/config";
import styled from 'styled-components'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const {publicRuntimeConfig} = getConfig();

const GalleryImg = styled.img`
    width:auto;
    height:auto;
`

const EnhancedIcon = styled(FavoriteBorderIcon)`
    cursor:pointer;
`


export default function Home() {
    const [searchString, setSearchString] = useState('')
    const [items, setItems] = useState([])
    const onSearch = () => {
        if (searchString) {
            request({
                url: `${publicRuntimeConfig.CLIENT_API_URL}/images?search=${searchString}`,
            }).then(setItems)
        }
    }
    const onLike = (id, isLiked) => {
        request({
            url: `${publicRuntimeConfig.CLIENT_API_URL}/likes`,
            method: isLiked ? 'DELETE' : 'POST',
            body: {
                id
            }
        }).then(onSearch)
    }

    return (
        <FlexBlock justifyCenter>
            <Head>
                <title>Imagify</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
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
                {items.map(({url, id, isLiked}, index) => {
                    return (
                        <FlexBlock key={index} column m={20}>
                            <GalleryImg src={url}/>
                            <FlexBlock justifyCenter>
                                <EnhancedIcon
                                    color={isLiked ? 'secondary' : ''}
                                    onClick={() => onLike(id, isLiked)}
                                />
                            </FlexBlock>
                        </FlexBlock>
                    )
                })}
            </FlexBlock>
        </FlexBlock>
    )
}


export async function getServerSideProps(context) {
    redirectUnauthorizedToLogin(context);
    return {
        props: {}
    };
}
