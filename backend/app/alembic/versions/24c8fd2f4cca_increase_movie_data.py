"""increase movie data

Revision ID: 24c8fd2f4cca
Revises: 01f0dc1b3ed3
Create Date: 2024-11-09 23:45:42.575793

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision: str = '24c8fd2f4cca'
down_revision: Union[str, None] = '01f0dc1b3ed3'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('country',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sqlmodel.sql.sqltypes.AutoString(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_country_name'), 'country', ['name'], unique=True)
    op.create_table('director',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('full_name', sqlmodel.sql.sqltypes.AutoString(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('full_name')
    )
    op.create_table('genre',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sqlmodel.sql.sqltypes.AutoString(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_genre_name'), 'genre', ['name'], unique=True)
    op.create_table('countrymovielink',
    sa.Column('movie_id', sa.Integer(), nullable=False),
    sa.Column('country_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['country_id'], ['country.id'], ),
    sa.ForeignKeyConstraint(['movie_id'], ['movie.id'], ),
    sa.PrimaryKeyConstraint('movie_id', 'country_id')
    )
    op.create_table('directormovielink',
    sa.Column('movie_id', sa.Integer(), nullable=False),
    sa.Column('director_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['director_id'], ['director.id'], ),
    sa.ForeignKeyConstraint(['movie_id'], ['movie.id'], ),
    sa.PrimaryKeyConstraint('movie_id', 'director_id')
    )
    op.create_table('genremovielink',
    sa.Column('movie_id', sa.Integer(), nullable=False),
    sa.Column('genre_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['genre_id'], ['genre.id'], ),
    sa.ForeignKeyConstraint(['movie_id'], ['movie.id'], ),
    sa.PrimaryKeyConstraint('movie_id', 'genre_id')
    )
    op.create_table('rating',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('movie_id', sa.Integer(), nullable=False),
    sa.Column('source', sqlmodel.sql.sqltypes.AutoString(length=255), nullable=False),
    sa.Column('vote_average', sa.Float(), nullable=False),
    sa.Column('vote_count', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['movie_id'], ['movie.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('movie', sa.Column('ru_title', sqlmodel.sql.sqltypes.AutoString(length=255), nullable=False))
    op.add_column('movie', sa.Column('en_title', sqlmodel.sql.sqltypes.AutoString(length=255), nullable=False))
    op.add_column('movie', sa.Column('original_title', sqlmodel.sql.sqltypes.AutoString(length=255), nullable=False))
    op.add_column('movie', sa.Column('image_path', sqlmodel.sql.sqltypes.AutoString(length=255), nullable=False))
    op.add_column('movie', sa.Column('duration', sa.Integer(), nullable=False))
    op.add_column('movie', sa.Column('imdb_id', sqlmodel.sql.sqltypes.AutoString(length=16), nullable=False))
    op.add_column('movie', sa.Column('tmdb_id', sa.Integer(), nullable=False))
    op.add_column('movie', sa.Column('release_date', sa.Date(), nullable=False))
    op.create_unique_constraint(None, 'movie', ['tmdb_id'])
    op.create_unique_constraint(None, 'movie', ['imdb_id'])
    op.drop_column('movie', 'genre')
    op.drop_column('movie', 'rating')
    op.drop_column('movie', 'image_url')
    op.drop_column('movie', 'title')
    op.drop_column('movie', 'year')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('movie', sa.Column('year', sa.INTEGER(), autoincrement=False, nullable=False))
    op.add_column('movie', sa.Column('title', sa.VARCHAR(), autoincrement=False, nullable=False))
    op.add_column('movie', sa.Column('image_url', sa.VARCHAR(length=255), autoincrement=False, nullable=True))
    op.add_column('movie', sa.Column('rating', sa.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=False))
    op.add_column('movie', sa.Column('genre', sa.VARCHAR(), autoincrement=False, nullable=False))
    op.drop_constraint(None, 'movie', type_='unique')
    op.drop_constraint(None, 'movie', type_='unique')
    op.drop_column('movie', 'release_date')
    op.drop_column('movie', 'tmdb_id')
    op.drop_column('movie', 'imdb_id')
    op.drop_column('movie', 'duration')
    op.drop_column('movie', 'image_path')
    op.drop_column('movie', 'original_title')
    op.drop_column('movie', 'en_title')
    op.drop_column('movie', 'ru_title')
    op.drop_table('rating')
    op.drop_table('genremovielink')
    op.drop_table('directormovielink')
    op.drop_table('countrymovielink')
    op.drop_index(op.f('ix_genre_name'), table_name='genre')
    op.drop_table('genre')
    op.drop_table('director')
    op.drop_index(op.f('ix_country_name'), table_name='country')
    op.drop_table('country')
    # ### end Alembic commands ###
