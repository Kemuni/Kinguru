"""Add new fields for movies

Revision ID: 01f0dc1b3ed3
Revises: 0ef258827b9f
Create Date: 2024-10-22 22:16:26.518740

"""
from typing import Sequence, Union
import sqlmodel.sql.sqltypes
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '01f0dc1b3ed3'
down_revision: Union[str, None] = '0ef258827b9f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('movie', sa.Column('image_url', sqlmodel.sql.sqltypes.AutoString(length=255), nullable=True))
    op.alter_column('movie', 'description',
               existing_type=sa.VARCHAR(),
               type_=sa.Text(),
               nullable=False)
    op.alter_column('movie', 'year',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('movie', 'rating',
               existing_type=sa.DOUBLE_PRECISION(precision=53),
               nullable=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('movie', 'rating',
               existing_type=sa.DOUBLE_PRECISION(precision=53),
               nullable=True)
    op.alter_column('movie', 'year',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('movie', 'description',
               existing_type=sa.Text(),
               type_=sa.VARCHAR(),
               nullable=True)
    op.drop_column('movie', 'image_url')
    # ### end Alembic commands ###
