import { Produto } from "app/models/produtos";
import { useProdutoService } from "app/services";
import { Layout, Input, Message } from "components";
import { useState, useEffect } from "react";
import { ConverterEmBigDecimal, formatReal } from "app/util/money";
import { Alert } from "components/common/message";
import * as yup from "yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { number } from "yup/lib/locale";

const validationSchema = yup.object().shape({
	sku: yup.string().trim().required("Campo obrigatório *"),
	nome: yup.string().trim().required("Campo obrigatório *"),
	descricao: yup.string().trim().required("Campo obrigatório *"),
	preco: yup.string().required("Campo obrigatório *")
});

interface FormErrors {
	sku?: string;
	nome?: string;
	descricao?: string;
	preco?: string;
}

export const CadastroProdutos: React.FC = () => {
	const [sku, setSku] = useState<string>("");
	const [preco, setPreco] = useState<string>("");
	const [nome, setNome] = useState<string>("");
	const [descricao, setDescricao] = useState<string>("");
	const service = useProdutoService();
	const [id, setId] = useState<string>("");
	const [dataCadastro, setDataCadastro] = useState<string>("");
	const [messages, setMessages] = useState<Array<Alert>>([]);
	const [errors, setErrors] = useState<FormErrors>({});
	const router = useRouter();
	const { id: idToUpdate } = router.query;

	useEffect(() => {
		if (idToUpdate) {
			service.carregarProduto(`${idToUpdate}`).then(produto => {
				setId(`${produto.id}`);
				setSku(`${produto.sku}`);
				setNome(`${produto.nome}`);
				setDescricao(`${produto.descricao}`);
				setPreco(formatReal(`${produto.preco}`));
				setDataCadastro(`${produto.dataCadastro}`);
			});
		}
	}, [idToUpdate]);

	const submit = () => {
		const produto: Produto = {
			id,
			sku,
			preco: ConverterEmBigDecimal(preco),
			nome,
			descricao
		};

		validationSchema
			.validate(produto)
			.then(obj => {
				setErrors({});
				if (id) {
					service.update(produto).then(resopnse => {
						setMessages([
							{ tipo: "success", texto: "Produto atualizado com sucesso!" }
						]);
					});
				} else {
					service.create(produto).then(response => {
						setId(response.id ? response.id : "ERROR");
						setDataCadastro(
							response.dataCadastro ? response.dataCadastro : "ERROR"
						);
						setMessages([
							{ tipo: "success", texto: "Produto salvo com sucesso!" }
						]);
					});
				}
			})
			.catch(err => {
				const field = err.path;
				const message = err.message;

				setErrors({
					[field]: message
				});
			});
	};

	return (
		<>
			<Layout titulo="Cadastro de produtos" mensagens={messages}>
				{id && (
					<div className="columns">
						<Input
							label="Código: "
							columnClasses="is-half"
							value={id}
							id="inputId"
							disabled
						/>

						<Input
							label="Data de cadastro: "
							columnClasses="is-half"
							value={dataCadastro}
							id="inputDataCadastro"
							disabled
						/>
					</div>
				)}
				<div className="columns">
					{/** SKU PRODUTO */}
					<Input
						label="SKU *"
						columnClasses="is-half"
						onChange={setSku}
						value={sku}
						id="inputSku"
						placeholder="Digite o sku do produto"
						error={errors.sku}
					/>

					{/** PREÇO PRODUTO */}
					<Input
						label="Preço *"
						columnClasses="is-half"
						onChange={setPreco}
						value={preco}
						id="inputPreco"
						placeholder="Digite o preço do produto"
						currency
						maxLength={16}
						error={errors.preco}
					/>
				</div>

				{/** NOME PRODUTO */}
				<div className="columns">
					<Input
						label="Nome *"
						columnClasses="is-full"
						onChange={setNome}
						value={nome}
						id="inputNome"
						placeholder="Digite o nome do produto"
						error={errors.nome}
					/>
				</div>

				{/** DESCRIÇÃO PRODUTO */}
				<div className="columns">
					<div className="field column is-full">
						<label htmlFor="inputDescricao" className="label">
							Descição *
						</label>
						<div className="control">
							<textarea
								id="inputDescricao"
								className="textarea"
								placeholder="Digite a descrição do produto"
								value={descricao}
								onChange={event => setDescricao(event.target.value)}
							/>
							{errors.descricao && (
								<p className="help is-danger">{errors.descricao}</p>
							)}
						</div>
					</div>
				</div>

				{/** BOTÕES */}
				<div className="field is-grouped">
					<div className="control">
						<button className="button is-link" onClick={submit}>
							{id ? "Atualizar" : "Salvar"}
						</button>
					</div>
					<div className="control">
						<Link href="/consultas/produtos">
							<button className="button">Voltar</button>
						</Link>
					</div>
				</div>
			</Layout>
		</>
	);
};
