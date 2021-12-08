import { Produto } from "app/models/produtos";
import { useState } from "react";

interface TabelaProdutosProps {
	produtos: Array<Produto>;
	onEdit: (produto: Produto) => void;
	onDelete: (produto: Produto) => void;
}

export const TabelaProdutos: React.FC<TabelaProdutosProps> = ({
	produtos,
	onEdit,
	onDelete
}: TabelaProdutosProps) => {
	return (
		<>
			<table className="table is-striped is-hoverable">
				<thead>
					<tr>
						<th>ID</th>
						<th>SKU</th>
						<th>Nome</th>
						<th>Preço</th>
						<th>Ações</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{produtos.map(produto => (
						<ProdutoRow
							onDelete={onDelete}
							onEdit={onEdit}
							key={produto.id}
							produto={produto}
						/>
					))}
				</tbody>
			</table>
		</>
	);
};

interface ProdutoRowProps {
	produto: Produto;
	onEdit: (produto: Produto) => void;
	onDelete: (produto: Produto) => void;
}

const ProdutoRow: React.FC<ProdutoRowProps> = ({
	produto,
	onEdit,
	onDelete
}: ProdutoRowProps) => {
	const [deletando, setDeletando] = useState(false);

	const onDeleteClick = (produto: Produto) => {
		if (deletando) {
			onDelete(produto);
			setDeletando(false);
		} else {
			setDeletando(true);
		}
	};

	const cancelaDelete = () => setDeletando(false);

	return (
		<>
			<tr>
				<td>{produto.id}</td>
				<td>{produto.sku}</td>
				<td>{produto.nome}</td>
				<td>{produto.preco}</td>
				<td>
					{!deletando && (
						<button
							onClick={e => onEdit(produto)}
							className="button is-success is-small"
						>
							Editar
						</button>
					)}
					<button
						onClick={e => onDeleteClick(produto)}
						className="button is-small"
						style={{ marginLeft: "10px" }}
					>
						{deletando ? "Confirmar deleção" : "Deletar"}
					</button>
					{deletando && (
						<button
							onClick={cancelaDelete}
							className="button is-outlined is-small"
							style={{ marginLeft: "10px" }}
						>
							cancelar
						</button>
					)}
				</td>
			</tr>
		</>
	);
};
