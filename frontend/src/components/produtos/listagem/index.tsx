import { Layout, Loader } from "components";
import Link from "next/link";
import { TabelaProdutos } from "./tabela";
import { Produto } from "app/models/produtos";
import useSWR from "swr";
import { httpClient } from "app/http";
import { Axios, AxiosResponse } from "axios";
import Router from "next/router";
import { useProdutoService } from "app/services";
import { useState, useEffect } from "react";
import { Alert } from "components/common/message";

export const ListagemProdutos: React.FC = () => {
	const [messages, setMessages] = useState<Array<Alert>>([]);
	const [lista, setLista] = useState<Produto[]>([]);
	const service = useProdutoService();
	const { data: result, error } = useSWR<AxiosResponse<Produto[]>>(
		"/produtos",
		url => httpClient.get<Produto[]>(url)
	);

	useEffect(() => {
		setLista(result?.data || []);
	}, [result]);

	const editar = (produto: Produto) => {
		const url = `/cadastros/produtos?id=${produto.id}`;
		Router.push(url);
	};

	const deletar = (produto: Produto) => {
		service.deletar(`${produto.id}`).then(response => {
			setMessages([{ tipo: "success", texto: "Produto deletado" }]);
		});
		const listaAlterada: Produto[] = lista?.filter(
			prod => prod.id !== produto.id
		);
		setLista(listaAlterada);
	};

	return (
		<>
			<Layout titulo="Lista de Produtos" mensagens={messages}>
				<Link href="/cadastros/produtos">
					<button
						className="button is-warning"
						style={{ marginBottom: "20px" }}
					>
						Cadastrar novo produto
					</button>
				</Link>
				<br />
				<Loader show={!result} />
				<TabelaProdutos onEdit={editar} onDelete={deletar} produtos={lista} />
			</Layout>
		</>
	);
};
