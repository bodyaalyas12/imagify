import Layout from "../components/Layout";
import {useEffect, useState} from "react";
import request from "../components/helpers/request";
import getConfig from "next/config";
import CircularProgress from "@material-ui/core/CircularProgress";
import {FlexBlock} from "../components/styled";
import styled from "styled-components";

const {publicRuntimeConfig} = getConfig();

const HistoryItem = styled.div`
    padding:5px 10px;
    border: 1px solid #708090;
    margin: 10px;
    border-radius:5px;
    color:#000080;
`

const History = () => {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        request({
            url: `${publicRuntimeConfig.CLIENT_API_URL}/history`,
        }).then((res) => {
            setItems(res)
            setLoading(false)
        })
    }, [])
    return (
        <Layout>
            {loading ?
                <CircularProgress/>
                :
                <FlexBlock width={100}>
                    {items.length > 0 ? items.map(item => <HistoryItem>{item}</HistoryItem>)
                        : 'History is empty'
                    }
                </FlexBlock>
            }
        </Layout>
    )
}

export default History
